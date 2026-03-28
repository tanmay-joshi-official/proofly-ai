'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function AnalyzerForm({ type, onSubmit, placeholder, children }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please provide input to analyze');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const payload = type === 'email' || type === 'link' ? { [type]: input } : { [type === 'image' ? 'description' : 'videoLink']: input };
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-dark-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'resize-none transition-all',
            error ? 'border-danger' : 'border-gray-300 dark:border-gray-600'
          )}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-danger text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </div>

      {children}

      <motion.button
        type="submit"
        disabled={isLoading || !input.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          'w-full py-3 px-6 rounded-xl font-semibold text-white',
          'bg-gradient-to-r from-primary-500 to-primary-600',
          'hover:from-primary-600 hover:to-primary-700',
          'shadow-lg hover:shadow-xl transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing with AI...
          </>
        ) : (
          <>
            <Send size={20} />
            Analyze Content
          </>
        )}
      </motion.button>
    </form>
  );
}
