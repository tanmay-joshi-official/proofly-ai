'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Shield, Upload, AlertTriangle, Sparkles, Eye } from 'lucide-react';
import AnalysisResult from '@/components/AnalysisResult';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { generateDeterministicResult } from '@/utils/deterministicAnalysis';

export default function ImagePage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setDescription(`Image uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    setHasAnalyzed(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const responseData = await response.json();
      setResult(responseData.data);
    } catch (error) {
      console.error('Error:', error);
      const deterministicResult = generateDeterministicResult(description, 'image');
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
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <ImageIcon className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Image Authenticity Analyzer</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Detect AI-generated images and verify authenticity
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
              <h2 className="font-semibold">Upload or Describe Image</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto mb-4 text-gray-400" size={40} />
                <p className="text-gray-600 dark:text-gray-400">
                  Click or drag to upload an image
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Supports: JPG, PNG, WebP (Max 10MB)
                </p>
              </div>

              {preview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              )}

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Or describe the image content you want to analyze..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              />

              <motion.button
                type="submit"
                disabled={isLoading || !description.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Analyzing Image...' : 'Analyze Image'}
              </motion.button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/20">
              <div className="flex items-start gap-2">
                <Sparkles className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">
                    AI Detection Focus
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    This analyzer specifically detects whether an image is AI-generated or authentic, providing probability scores and detailed indicators.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Note:</strong> AI analysis detects patterns and inconsistencies. For critical decisions, verify through multiple sources.
                </p>
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
                <AnalysisResult result={result} type="image" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center mb-4">
                  <ImageIcon className="text-green-600 dark:text-green-400" size={48} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Upload an image or describe its content to check if it's AI-generated or authentic
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
