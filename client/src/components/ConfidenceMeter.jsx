'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

export default function ConfidenceMeter({ label, value, type = 'ai' }) {
  const getColor = () => {
    if (type === 'ai') {
      if (value >= 70) return { bar: 'bg-purple-500', text: 'text-purple-600' };
      if (value >= 40) return { bar: 'bg-yellow-500', text: 'text-yellow-600' };
      return { bar: 'bg-green-500', text: 'text-green-600' };
    }
    if (type === 'real') {
      if (value >= 70) return { bar: 'bg-green-500', text: 'text-green-600' };
      if (value >= 40) return { bar: 'bg-yellow-500', text: 'text-yellow-600' };
      return { bar: 'bg-purple-500', text: 'text-purple-600' };
    }
    return { bar: 'bg-blue-500', text: 'text-blue-600' };
  };

  const color = getColor();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className={clsx('text-sm font-bold', color.text)}>
          {value}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={clsx('h-full rounded-full', color.bar)}
        />
      </div>
    </div>
  );
}
