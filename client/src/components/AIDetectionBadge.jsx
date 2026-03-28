'use client';

import { motion } from 'framer-motion';
import { Sparkles, Eye, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function AIDetectionBadge({ isAIGenerated, confidence, size = 'md' }) {
  const config = isAIGenerated
    ? {
        icon: Sparkles,
        label: 'AI Generated',
        bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
        text: 'text-white',
        description: `Detected with ${confidence}% confidence`,
        border: 'border-purple-300'
      }
    : {
        icon: Eye,
        label: 'Authentic/Real',
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        text: 'text-white',
        description: `Verified as real with ${confidence}% confidence`,
        border: 'border-green-300'
      };

  const Icon = config.icon;

  const sizeClasses = {
    sm: { badge: 'px-3 py-1.5 text-xs', icon: 14 },
    md: { badge: 'px-4 py-2 text-sm', icon: 18 },
    lg: { badge: 'px-6 py-3 text-base', icon: 24 }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={clsx(
        'rounded-xl border-2 shadow-lg',
        config.bg,
        config.text,
        sizeClasses[size].badge
      )}
    >
      <div className="flex items-center gap-2">
        <Icon size={sizeClasses[size].icon} />
        <div>
          <div className="font-bold">{config.label}</div>
          <div className={clsx('text-xs opacity-90', size === 'sm' && 'hidden')}>
            {config.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
