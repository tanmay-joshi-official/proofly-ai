'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';

export default function TrustScore({ score, riskLevel, size = 'lg' }) {
  const getScoreColor = () => {
    if (score >= 70) return 'text-safe';
    if (score >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getGradient = () => {
    if (score >= 70) return 'from-safe/20 to-safe/5';
    if (score >= 40) return 'from-warning/20 to-warning/5';
    return 'from-danger/20 to-danger/5';
  };

  const getIcon = () => {
    if (score >= 70) return <Shield className="text-safe" />;
    if (score >= 40) return <AlertTriangle className="text-warning" />;
    return <AlertOctagon className="text-danger" />;
  };

  const sizeClasses = {
    sm: 'w-24 h-24 text-3xl',
    md: 'w-32 h-32 text-4xl',
    lg: 'w-40 h-40 text-5xl',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'relative rounded-full bg-gradient-to-br shadow-2xl',
        getGradient(),
        sizeClasses[size]
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="mb-2">
          {getIcon()}
        </div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={clsx('font-bold', getScoreColor(), {
            'text-4xl': size === 'sm',
            'text-5xl': size === 'md',
            'text-6xl': size === 'lg',
          })}
        >
          {score}
        </motion.span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
          Trust Score
        </span>
      </div>

      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className={clsx(
            score >= 70 ? 'text-safe/30' : score >= 40 ? 'text-warning/30' : 'text-danger/30'
          )}
          strokeDasharray={`${(score / 100) * 283} 283`}
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
