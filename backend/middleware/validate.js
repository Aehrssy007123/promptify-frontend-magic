const { z } = require('zod');

const improveSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').max(4000, 'Prompt must be at most 4000 characters'),
  mode: z.enum(['creative', 'professional', 'simple', 'detailed']).default('professional'),
  format: z.enum(['paragraph', 'bullet_points', 'step_by_step', 'json']).default('paragraph'),
  platform: z.enum(['chatgpt', 'claude', 'gemini', 'midjourney', 'stable_diffusion']).default('chatgpt'),
});

const validateImprove = (req, res, next) => {
  const result = improveSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }
  req.body = result.data;
  next();
};

module.exports = { validateImprove };
