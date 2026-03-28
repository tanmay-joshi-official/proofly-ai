import express from 'express';
import { analyzeWithMinimax, createAnalysisPrompt } from '../utils/minimax.js';
import Analysis from '../models/Analysis.js';
import { generateDeterministicResult } from '../utils/deterministicAnalysis.js';

const router = express.Router();

router.post('/analyze-video', async (req, res) => {
  try {
    const { videoLink, description } = req.body;

    if (!videoLink && !description) {
      return res.status(400).json({ error: 'Video link or description is required' });
    }

    const content = videoLink || description;
    const prompt = `Analyze the following VIDEO for deepfake detection, AI generation, and authenticity.

CRITICAL: Determine if this video is AI-generated/deepfake or AUTHENTIC/real.

Return your analysis in this exact JSON format:
{
  "trustScore": [0-100] (considering AI/deepfake detection - lower if AI-generated),
  "riskLevel": "Low|Medium|High" (High if deepfake/AI, Low if authentic),
  "aiGenerated": [true if AI/deepfake, false if authentic],
  "aiGeneratedProbability": [0-100] (probability that this is AI-generated/deepfake),
  "aiGenerationIndicators": ["specific deepfake indicator 1", "indicator 2", "indicator 3"] (ONLY if AI-generated),
  "authenticityMarkers": ["specific authenticity marker 1", "marker 2"] (ONLY if authentic),
  "keyRedFlags": ["flag1", "flag2"],
  "deepfakeSignals": ["signal1", "signal2", "signal3"] (specific deepfake indicators),
  "internetInsights": {
    "similarCases": "Description of similar deepfake or authentic videos found",
    "credibility": "Assessment considering deepfake detection",
    "userReports": "User reports or mentions found",
    "overallSentiment": "Positive|Negative|Neutral"
  },
  "finalVerdict": "Your final assessment focusing on deepfake vs real determination",
  "recommendedAction": "What the user should do based on deepfake detection result",
  "explanation": "Detailed explanation of why you believe this is a deepfake or authentic"
}

Content to analyze:
${content}`;

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
      result = generateDeterministicResult(content, 'video');
      result.explanation = aiResponse.substring(0, 500);
    }

    const analysis = new Analysis({
      type: 'video',
      input: videoLink || description,
      result
    });
    await analysis.save();

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Video Analysis Error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

export default router;
