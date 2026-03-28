import express from 'express';
import { analyzeWithMinimax, createAnalysisPrompt } from '../utils/minimax.js';
import Analysis from '../models/Analysis.js';
import { generateDeterministicResult } from '../utils/deterministicAnalysis.js';

const router = express.Router();

router.post('/analyze-link', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const prompt = createAnalysisPrompt('link/URL', url);
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
      result = generateDeterministicResult(url, 'link');
      result.keyRedFlags.push('Unable to parse AI response - used fallback');
      result.explanation = aiResponse.substring(0, 500);
    }

    const analysis = new Analysis({
      type: 'link',
      input: url,
      result
    });
    await analysis.save();

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Link Analysis Error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

export default router;
