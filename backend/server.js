const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/improve', require('./routes/improve'));
app.use('/api/v1/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    demoMode: !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here',
  });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Prompt Improviser API running on http://localhost:${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/api/health`);
  const demoMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here';
  if (demoMode) {
    console.log('⚠️  DEMO MODE: Set GEMINI_API_KEY in .env for real AI responses\n');
  } else {
    console.log('✅  Gemini API key detected — live AI mode active\n');
  }
});
