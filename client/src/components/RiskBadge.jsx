'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, AlertOctagon, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function RiskBadge({ level, size = 'md' }) {
  const getConfig = () => {
    switch (level) {
      case 'Low':
        return {
          icon: CheckCircle,
          bg: 'bg-safe/10 text-safe border-safe/20',
          text: 'Low Risk',
        };
      case 'Medium':
        return {
          icon: AlertTriangle,
          bg: 'bg-warning/10 text-warning border-warning/20',
          text: 'Medium Risk',
        };
      case 'High':
        return {
          icon: AlertOctagon,
          bg: 'bg-danger/10 text-danger border-danger/20',
          text: 'High Risk',
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold',
        config.bg,
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}
    >
      <Icon size={size === 'sm' ? 14 : 16} />
      <span>{config.text}</span>
    </motion.div>
  );
}
