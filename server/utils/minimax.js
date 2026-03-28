import axios from 'axios';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const MINIMAX_API_URL = process.env.MINIMAX_API_URL || 'https://api.minimax.chat/v1/text/chatcompletion_pro';

export const analyzeWithMinimax = async (prompt) => {
  try {
    const response = await axios.post(
      MINIMAX_API_URL,
      {
        model: 'MiniMax-2.7B',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${MINIMAX_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('MiniMax API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'AI Analysis Failed');
  }
};

export const createAnalysisPrompt = (type, content) => {
  return `Analyze the following ${type} for authenticity and risk.
    
    Return your analysis in this exact JSON format:
    {
      "trustScore": [0-100],
      "riskLevel": "Low|Medium|High",
      "keyRedFlags": ["flag1", "flag2", "flag3"],
      "deepfakeSignals": ["signal1", "signal2"] (if applicable),
      "internetInsights": {
        "similarCases": "Description of similar cases found",
        "credibility": "Assessment of credibility",
        "userReports": "User reports or mentions found",
        "overallSentiment": "Positive|Negative|Neutral"
      },
      "finalVerdict": "Your final assessment",
      "recommendedAction": "What the user should do",
      "explanation": "Detailed explanation of your analysis"
    }

    Content to analyze:
    ${content}`;
};
