'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield } from 'lucide-react';
import AnalyzerForm from '@/components/AnalyzerForm';
import AnalysisResult from '@/components/AnalysisResult';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { generateDeterministicResult } from '@/utils/deterministicAnalysis';

export default function EmailPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setHasAnalyzed(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze-email', {
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
      const deterministicResult = generateDeterministicResult(data.email, 'email');
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
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Mail className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Email Scam Detector</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Analyze emails for phishing attempts and fraudulent content
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
              <h2 className="font-semibold">Paste Email Content</h2>
            </div>
            <AnalyzerForm
              type="email"
              onSubmit={handleSubmit}
              placeholder="Paste the full email content here including headers, sender info, and body..."
            />
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
                <AnalysisResult result={result} type="email" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Shield className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Paste an email above to get started with AI-powered analysis
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
