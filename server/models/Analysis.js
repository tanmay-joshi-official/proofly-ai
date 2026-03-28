import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['email', 'link', 'image', 'video'],
    required: true
  },
  input: {
    type: String,
    required: true
  },
  result: {
    trustScore: Number,
    riskLevel: String,
    keyRedFlags: [String],
    deepfakeSignals: [String],
    internetInsights: {
      similarCases: String,
      credibility: String,
      userReports: String,
      overallSentiment: String
    },
    finalVerdict: String,
    recommendedAction: String,
    explanation: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
