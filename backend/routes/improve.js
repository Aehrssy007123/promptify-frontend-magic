const express = require('express');
const router = express.Router();
const { validateImprove } = require('../middleware/validate');
const { improveLimiter } = require('../middleware/rateLimit');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const MODE_PROMPTS = {
  creative: 'You are a creative writing expert. Improve the user\'s prompt to be more imaginative, vivid, and engaging. Add creative flair while preserving the original intent.',
  professional: 'You are a professional communication expert. Improve the user\'s prompt to be clear, precise, and authoritative. Use professional vocabulary and structured language.',
  simple: 'You are a plain-language specialist. Improve the user\'s prompt to be simple, direct, and easy to understand. Avoid jargon and use straightforward language.',
  detailed: 'You are a detail-oriented technical expert. Improve the user\'s prompt by adding specificity, context, constraints, and clear success criteria. Make it comprehensive.',
};

const FORMAT_INSTRUCTIONS = {
  paragraph: 'Output the improved prompt as a well-structured paragraph.',
  bullet_points: 'Output the improved prompt as bullet points, with each key element on its own line starting with "•".',
  step_by_step: 'Output the improved prompt as numbered steps, clearly labeling each step.',
  json: 'Output the improved prompt as a JSON object with keys: "role", "task", "context", "constraints", "output_format". Use proper JSON syntax.',
};

const PLATFORM_INSTRUCTIONS = {
  chatgpt: 'Optimize for ChatGPT (GPT-4). Use conversational yet precise language. Include context about role and desired output style.',
  claude: 'Optimize for Claude by Anthropic. Claude appreciates detailed context, explicit reasoning requests, and nuanced instructions.',
  gemini: 'Optimize for Google Gemini. Use structured prompts with clear sections and leverage Gemini\'s strength in multimodal and research tasks.',
  midjourney: 'Optimize for Midjourney image generation. Include style descriptors, artistic references, lighting, mood, and append "--ar 16:9 --style raw --q 2" as suffix examples.',
  stable_diffusion: 'Optimize for Stable Diffusion. Use comma-separated tags, include positive descriptors, quality tokens like "masterpiece, best quality, 8k, detailed", and specify negative prompts.',
};

function buildSystemPrompt(mode, format, platform) {
  return `${MODE_PROMPTS[mode]}\n\nPlatform target: ${PLATFORM_INSTRUCTIONS[platform]}\n\nFormat instruction: ${FORMAT_INSTRUCTIONS[format]}\n\nIMPORTANT: Return ONLY the improved prompt text. Do not include explanations, preambles, or commentary.`;
}

function getMockResponse(prompt, mode, format, platform) {
  return `[DEMO MODE — Add GEMINI_API_KEY to backend/.env for real AI responses]\n\nImproved ${mode.toUpperCase()} prompt for ${platform.toUpperCase()}:\n\n${prompt.trim()}\n\nEnhanced with: clear context, specific output requirements, role definition, and ${format.replace('_', ' ')} formatting. This demonstrates how your prompt would look after AI improvement.`;
}

router.post('/', improveLimiter, validateImprove, async (req, res) => {
  const start = Date.now();
  const { prompt, mode, format, platform } = req.body;
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.json({ improved: getMockResponse(prompt, mode, format, platform), tokens_used: 0, latency_ms: Date.now() - start, demo_mode: true });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = buildSystemPrompt(mode, format, platform);
    const result = await model.generateContent(`${systemPrompt}\n\nUser prompt to improve: ${prompt}`);
    const response = await result.response;
    const improved = response.text().trim();

    return res.json({ improved, tokens_used: 0, latency_ms: Date.now() - start, demo_mode: false });
  } catch (err) {
    console.error('[improve] Error:', err.message);
    return res.status(500).json({ error: 'AI service error', message: err.message });
  }
});

router.post('/regenerate', improveLimiter, validateImprove, async (req, res) => {
  const start = Date.now();
  const { prompt, mode, format, platform } = req.body;
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.json({ improved: getMockResponse(prompt, mode, format, platform) + '\n\n[Regenerated variation]', tokens_used: 0, latency_ms: Date.now() - start, demo_mode: true });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = buildSystemPrompt(mode, format, platform);
    const result = await model.generateContent(`Generate a creative variation of this improvement request.\n\n${systemPrompt}\n\nUser prompt to improve: ${prompt}`);
    const response = await result.response;
    const improved = response.text().trim();

    return res.json({ improved, tokens_used: 0, latency_ms: Date.now() - start });
  } catch (err) {
    console.error('[regenerate] Error:', err.message);
    return res.status(500).json({ error: 'AI service error', message: err.message });
  }
});

module.exports = router;
