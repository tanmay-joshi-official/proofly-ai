import axios from 'axios';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const MINIMAX_API_URL = process.env.MINIMAX_API_URL || 'https://api.minimax.io/v1/text/chatcompletion_v2';
const GROUP_ID = process.env.GROUP_ID;

export const analyzeWithMinimax = async (prompt) => {
  try {
    if (!MINIMAX_API_KEY || !GROUP_ID) {
      throw new Error(`Missing config: API_KEY=${MINIMAX_API_KEY ? 'set' : 'undefined'}, GROUP_ID=${GROUP_ID}`);
    }
    
    console.log('Sending request to:', `${MINIMAX_API_URL}?groupid=${GROUP_ID}`);
    console.log('API Key (first 20 chars):', MINIMAX_API_KEY.substring(0, 20) + '...');
    
    const response = await axios.post(
      `${MINIMAX_API_URL}?groupid=${GROUP_ID}`,
      {
        model: 'MiniMax-M2.7',
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
    
    console.log('API Response:', JSON.stringify(response.data, null, 2));

    if (response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content;
    } else if (response.data.text) {
      return response.data.text;
    } else if (response.data.output) {
      return response.data.output;
    } else if (response.data.result) {
      return response.data.result;
    } else {
      console.log('MiniMax Response:', JSON.stringify(response.data, null, 2));
      throw new Error('Unexpected API response format');
    }
  } catch (error) {
    console.error('MiniMax API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.base_resp?.status_msg || 'AI Analysis Failed');
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
