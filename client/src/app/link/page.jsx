'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Shield, AlertTriangle } from 'lucide-react';
import AnalyzerForm from '@/components/AnalyzerForm';
import AnalysisResult from '@/components/AnalysisResult';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { generateDeterministicResult } from '@/utils/deterministicAnalysis';

export default function LinkPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setHasAnalyzed(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const responseData = await response.json();
      setResult(responseData.data);
    } catch (error) {
      console.error('Error:', error);
      const deterministicResult = generateDeterministicResult(data.url, 'link');
      setResult(deterministicResult);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <LinkIcon className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Link Safety Analyzer</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Verify URL authenticity and detect malicious links
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border-2 border-gray-300 dark:border-gray-600"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary-500" size={20} />
              <h2 className="font-semibold">Enter URL to Analyze</h2>
            </div>
            <AnalyzerForm
              type="link"
              onSubmit={handleSubmit}
              placeholder="Paste the URL you want to verify (e.g., https://example.com)..."
            />
            
            <div className="mt-4 p-4 rounded-xl bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-warning flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Tip:</strong> Always verify suspicious links through official channels before clicking
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {isLoading ? (
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <LoadingSkeleton />
              </div>
            ) : result ? (
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <AnalysisResult result={result} type="link" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <LinkIcon className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter a URL above to check its safety and authenticity
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
