import express from 'express';
import { analyzeWithMinimax, createAnalysisPrompt } from '../utils/minimax.js';
import Analysis from '../models/Analysis.js';
import { generateDeterministicResult } from '../utils/deterministicAnalysis.js';
import { cleanText, cleanListItems, cleanExplanation } from '../utils/textCleaner.js';

const router = express.Router();

router.post('/analyze-image', async (req, res) => {
  try {
    const { imageData, description } = req.body;

    if (!imageData && !description) {
      return res.status(400).json({ error: 'Image data or description is required' });
    }

    const content = description || `Image uploaded (base64 data)`;
    const prompt = `Analyze the following IMAGE for authenticity, AI generation detection, and manipulation.

CRITICAL: Determine if this image is AI-generated/artificially created or AUTHENTIC/real.

Return your analysis in this exact JSON format:
{
  "trustScore": [0-100] (considering AI detection - lower score if AI-generated),
  "riskLevel": "Low|Medium|High" (High if AI-generated, Low if authentic),
  "aiGenerated": [true if AI-generated, false if authentic],
  "aiGeneratedProbability": [0-100] (probability that this is AI-generated),
  "aiGenerationIndicators": ["specific indicator 1", "indicator 2", "indicator 3"] (ONLY if AI-generated),
  "authenticityMarkers": ["specific marker 1", "marker 2"] (ONLY if authentic),
  "keyRedFlags": ["flag1", "flag2"],
  "deepfakeSignals": [],
  "internetInsights": {
    "similarCases": "Description of similar cases found (AI or real images)",
    "credibility": "Assessment of credibility considering AI detection",
    "userReports": "User reports or mentions found",
    "overallSentiment": "Positive|Negative|Neutral"
  },
  "finalVerdict": "Your final assessment focusing on AI vs Real determination",
  "recommendedAction": "What the user should do based on AI detection result",
  "explanation": "Detailed explanation of why you believe this is AI-generated or authentic"
}

Content to analyze:
${content}`;

    const aiResponse = await analyzeWithMinimax(prompt);

    let result;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        let jsonStr = jsonMatch[0];
        jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
        result = JSON.parse(jsonStr);
        if (result.explanation) {
          result.explanation = cleanExplanation(result.explanation);
        }
        if (result.finalVerdict) {
          result.finalVerdict = cleanText(result.finalVerdict);
        }
        if (result.recommendedAction) {
          result.recommendedAction = cleanText(result.recommendedAction);
        }
        if (result.aiGenerationIndicators) {
          result.aiGenerationIndicators = cleanListItems(result.aiGenerationIndicators);
        }
        if (result.authenticityMarkers) {
          result.authenticityMarkers = cleanListItems(result.authenticityMarkers);
        }
        if (result.keyRedFlags) {
          result.keyRedFlags = cleanListItems(result.keyRedFlags);
        }
        if (result.deepfakeSignals) {
          result.deepfakeSignals = cleanListItems(result.deepfakeSignals);
        }
        if (result.internetInsights) {
          result.internetInsights.similarCases = cleanText(result.internetInsights.similarCases || '');
          result.internetInsights.credibility = cleanText(result.internetInsights.credibility || '');
          result.internetInsights.userReports = cleanText(result.internetInsights.userReports || '');
        }
      } else {
        throw new Error('No valid JSON found');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('AI Response:', aiResponse);
      result = generateDeterministicResult(content, 'image');
      result.keyRedFlags = result.keyRedFlags || [];
      result.keyRedFlags.push('Unable to parse AI response - used fallback');
      result.explanation = cleanExplanation(aiResponse.substring(0, 500));
    }

    const analysis = new Analysis({
      type: 'image',
      input: description || 'Uploaded image',
      result
    });
    await analysis.save();

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Image Analysis Error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

export default router;
