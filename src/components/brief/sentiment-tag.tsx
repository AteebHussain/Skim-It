'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sentiment } from '@/lib/types';

interface SentimentTagProps {
  sentiment?: Sentiment;
}

const SENTIMENT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  positive:   { color: '#2ecc71', bg: 'rgba(46,204,113,0.07)',  border: 'rgba(46,204,113,0.2)',  icon: '↑' },
  neutral:    { color: '#888888', bg: 'rgba(136,136,136,0.07)', border: 'rgba(136,136,136,0.2)', icon: '–' },
  negative:   { color: '#E63946', bg: 'rgba(230,57,70,0.07)',   border: 'rgba(230,57,70,0.2)',   icon: '↓' },
  analytical: { color: '#60a5fa', bg: 'rgba(96,165,250,0.07)',  border: 'rgba(96,165,250,0.2)',  icon: '◎' },
  critical:   { color: '#f97316', bg: 'rgba(249,115,22,0.07)',  border: 'rgba(249,115,22,0.2)',  icon: '!' },
};

export const SentimentTag: React.FC<SentimentTagProps> = ({ sentiment }) => {
  if (!sentiment) return null;
  const cfg = SENTIMENT_CONFIG[sentiment] ?? SENTIMENT_CONFIG.neutral;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <span
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide border"
        style={{
          color: cfg.color,
          background: cfg.bg,
          borderColor: cfg.border,
          fontFamily: 'var(--font-body)',
        }}
      >
        <span className="text-sm leading-none">{cfg.icon}</span>
        <span className="capitalize">{sentiment}</span>
      </span>
    </motion.div>
  );
};