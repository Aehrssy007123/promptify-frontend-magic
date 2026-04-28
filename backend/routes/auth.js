const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authLimiter } = require('../middleware/rateLimit');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const users = new Map();
const apiKeys = new Map();

function generateToken(userId) { return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' }); }
function generateApiKey() { return 'pi_' + require('crypto').randomBytes(24).toString('hex'); }

router.post('/signup', authLimiter, async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  if (users.has(email)) return res.status(409).json({ error: 'Email already in use' });
  const hashed = await bcrypt.hash(password, 12);
  const user = { id: Date.now().toString(), email, name: name || email.split('@')[0], passwordHash: hashed, createdAt: new Date() };
  users.set(email, user);
  const token = generateToken(user.id);
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  const user = users.get(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/logout', (req, res) => { res.json({ message: 'Logged out successfully' }); });

router.post('/api-key', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Authorization required' });
  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const key = generateApiKey();
    apiKeys.set(key, { userId: decoded.userId, createdAt: new Date() });
    res.json({ apiKey: key });
  } catch { res.status(401).json({ error: 'Invalid token' }); }
});

module.exports = router;
