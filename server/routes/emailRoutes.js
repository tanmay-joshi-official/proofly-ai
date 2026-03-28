import express from 'express';
import { analyzeWithMinimax, createAnalysisPrompt } from '../utils/minimax.js';
import Analysis from '../models/Analysis.js';
import { generateDeterministicResult } from '../utils/deterministicAnalysis.js';

const router = express.Router();

router.post('/analyze-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email content is required' });
    }

    const prompt = createAnalysisPrompt('email', email);
    const aiResponse = await analyzeWithMinimax(prompt);

    let result;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      result = generateDeterministicResult(email, 'email');
      result.keyRedFlags.push('Unable to parse AI response - used fallback');
      result.explanation = aiResponse.substring(0, 500);
    }

    const analysis = new Analysis({
      type: 'email',
      input: email,
      result
    });
    await analysis.save();

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Email Analysis Error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

export default router;
