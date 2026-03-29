'use client';

import { motion } from 'framer-motion';
import { Globe, AlertCircle, Info, TrendingUp, UserCheck, Sparkles, Eye, Zap } from 'lucide-react';
import TrustScore from './TrustScore';
import RiskBadge from './RiskBadge';
import ConfidenceMeter from './ConfidenceMeter';

export default function AnalysisResult({ result, type }) {
  const showAIDetection = type === 'image' || type === 'video';
  const isAIGenerated = result.aiGenerated === true || (result.aiGeneratedProbability >= 50);
  const aiConfidence = result.aiGeneratedProbability || (isAIGenerated ? 75 : 25);
  const realConfidence = 100 - aiConfidence;
  
  const displayScore = showAIDetection && isAIGenerated 
    ? Math.min(result.trustScore, 100 - aiConfidence) 
    : result.trustScore;
  
  const displayRiskLevel = showAIDetection && isAIGenerated 
    ? (aiConfidence >= 70 ? 'High' : aiConfidence >= 40 ? 'Medium' : 'Low')
    : result.riskLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center">
          <TrustScore score={displayScore} riskLevel={displayRiskLevel} />
          <div className="mt-6">
            <RiskBadge level={displayRiskLevel} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="text-primary-500" size={20} />
              Final Verdict
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{result.finalVerdict}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/20">
            <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 flex items-center gap-2">
              <UserCheck size={16} />
              Recommended Action
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {result.recommendedAction}
            </p>
          </div>
        </div>
      </div>

      {showAIDetection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-dark-100 dark:to-dark-200 border-2 border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              {isAIGenerated ? (
                <Sparkles className="text-white" size={24} />
              ) : (
                <Eye className="text-white" size={24} />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {isAIGenerated ? 'AI Generated Content Detected' : 'Authentic/Real Content'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {type === 'image' ? 'Image' : 'Video'} Authenticity Analysis
              </p>
            </div>
          </div>

          <div className="mb-6">
            <ConfidenceMeter
              label="AI Generated Probability"
              value={aiConfidence}
              type="ai"
            />
          </div>

          <div className="mb-6">
            <ConfidenceMeter
              label="Authentic/Real Probability"
              value={realConfidence}
              type="real"
            />
          </div>

          {result.aiGenerationIndicators && result.aiGenerationIndicators.length > 0 && (
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/20">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                <Zap size={16} />
                AI Generation Indicators Found:
              </h4>
              <div className="space-y-2">
                {result.aiGenerationIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.authenticityMarkers && result.authenticityMarkers.length > 0 && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/20 mt-4">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                <Eye size={16} />
                Authenticity Markers Found:
              </h4>
              <div className="space-y-2">
                {result.authenticityMarkers.map((marker, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{marker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="text-primary-500" size={20} />
          Detailed Analysis
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {result.explanation}
        </p>
      </motion.div>

      {result.keyRedFlags && result.keyRedFlags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-danger/5 dark:bg-danger/10 border border-danger/20"
        >
          <h3 className="text-lg font-semibold mb-4 text-danger flex items-center gap-2">
            <AlertCircle size={20} />
            Key Red Flags ({result.keyRedFlags.length})
          </h3>
          <div className="space-y-2">
            {result.keyRedFlags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{flag}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {result.deepfakeSignals && result.deepfakeSignals.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-warning/5 dark:bg-warning/10 border border-warning/20"
        >
          <h3 className="text-lg font-semibold mb-4 text-warning flex items-center gap-2">
            <AlertCircle size={20} />
            Deepfake Detection Signals
          </h3>
          <div className="space-y-2">
            {result.deepfakeSignals.map((signal, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{signal}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="text-primary-500" size={20} />
          Internet Research Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Similar Cases Reported
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {result.internetInsights.similarCases}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Credibility Assessment
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {result.internetInsights.credibility}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
              User Reports & Mentions
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {result.internetInsights.userReports}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Overall Sentiment
            </h4>
            <span className={`inline-flex items-center gap-1 text-sm font-medium ${
              result.internetInsights.overallSentiment === 'Positive' ? 'text-safe' :
              result.internetInsights.overallSentiment === 'Negative' ? 'text-danger' :
              'text-warning'
            }`}>
              {result.internetInsights.overallSentiment}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
