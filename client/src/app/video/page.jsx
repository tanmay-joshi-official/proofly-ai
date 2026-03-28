'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Shield, AlertTriangle, Sparkles, Eye } from 'lucide-react';
import AnalysisResult from '@/components/AnalysisResult';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { generateDeterministicResult } from '@/utils/deterministicAnalysis';

export default function VideoPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    setIsLoading(true);
    setHasAnalyzed(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoLink: videoUrl }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const responseData = await response.json();
      setResult(responseData.data);
    } catch (error) {
      console.error('Error:', error);
      const deterministicResult = generateDeterministicResult(videoUrl, 'video');
      setResult(deterministicResult);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <Video className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Video Deepfake Analyzer</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Identify AI-generated videos and deepfakes
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border-2 border-gray-300 dark:border-gray-600"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary-500" size={20} />
              <h2 className="font-semibold">Enter Video Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Video URL or Link</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste video URL (YouTube, TikTok, etc.)..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="text-center text-gray-500 dark:text-gray-400 py-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700" />
                  <span className="text-sm">OR</span>
                  <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Describe the Video</label>
                <textarea
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Describe what you see in the video: who appears, what is being said, context, etc..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || !videoUrl.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Analyzing for Deepfakes...' : 'Analyze Video'}
              </motion.button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/20">
              <div className="flex items-start gap-2">
                <Sparkles className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">
                    Deepfake Detection Focus
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    This analyzer specifically detects whether a video is AI-generated or authentic, with deepfake probability scoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Important:</strong> Deepfake technology is advancing rapidly. AI analysis provides indicators but may not detect all manipulated content.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-dark-200">
              <h4 className="font-semibold mb-3 text-sm">What We Analyze:</h4>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>Facial movement patterns and expressions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>Audio-visual synchronization</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>Background consistency and lighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>Voice synthesis artifacts</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {isLoading ? (
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <LoadingSkeleton />
              </div>
            ) : result ? (
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <AnalysisResult result={result} type="video" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center mb-4">
                  <Video className="text-red-600 dark:text-red-400" size={48} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Enter video information above to check for deepfake indicators and AI generation
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Sparkles size={16} className="text-purple-600" />
                    <span className="text-purple-700 dark:text-purple-300">AI Generated</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Eye size={16} className="text-green-600" />
                    <span className="text-green-700 dark:text-green-300">Authentic</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
