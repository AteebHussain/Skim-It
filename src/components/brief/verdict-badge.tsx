'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Verdict } from '@/lib/types';

interface VerdictBadgeProps {
  verdict?: Verdict;
}

const VERDICT_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
  'Worth It': {
    label: 'Worth Reading',
    icon: '✓',
    color: '#2ecc71',
    bg: 'rgba(46,204,113,0.07)',
    border: 'rgba(46,204,113,0.2)',
  },
  'Skim It': {
    label: 'Skim It',
    icon: '→',
    color: '#888888',
    bg: 'rgba(136,136,136,0.07)',
    border: 'rgba(136,136,136,0.2)',
  },
  'Skip It': {
    label: 'Skip It',
    icon: '✕',
    color: '#E63946',
    bg: 'rgba(230,57,70,0.07)',
    border: 'rgba(230,57,70,0.2)',
  },
};

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict }) => {
  if (!verdict) return null;
  const cfg = VERDICT_CONFIG[verdict as keyof typeof VERDICT_CONFIG] ?? VERDICT_CONFIG['Skim It'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.4 }}
      className="w-full"
    >
      <div
        className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border"
        style={{ background: cfg.bg, borderColor: cfg.border }}
      >
        <span
          className="text-xl font-black leading-none"
          style={{ color: cfg.color, fontFamily: 'var(--font-display)' }}
        >
          {cfg.icon}
        </span>
        <span
          className="text-sm font-bold tracking-wide uppercase"
          style={{ color: cfg.color, fontFamily: 'var(--font-body)', letterSpacing: '0.12em' }}
        >
          {cfg.label}
        </span>
      </div>
    </motion.div>
  );
};