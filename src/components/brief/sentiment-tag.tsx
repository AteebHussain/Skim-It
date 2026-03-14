'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sentiment } from '@/lib/types';

interface SentimentTagProps {
  sentiment?: Sentiment;
}

const SENTIMENT_STYLES: Record<string, { color: string; iconPath: string }> = {
  positive: { 
    color: 'text-green-400 bg-green-400/10',
    iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  neutral: { 
    color: 'text-zinc-400 bg-zinc-400/10',
    iconPath: 'M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  negative: { 
    color: 'text-red-400 bg-red-400/10',
    iconPath: 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  analytical: { 
    color: 'text-blue-400 bg-blue-400/10',
    iconPath: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  critical: { 
    color: 'text-purple-400 bg-purple-400/10',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
};

export const SentimentTag: React.FC<SentimentTagProps> = ({ sentiment }) => {
  if (!sentiment) return null;

  const style = SENTIMENT_STYLES[sentiment] || SENTIMENT_STYLES.neutral;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/10 ${style.color}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={style.iconPath} />
      </svg>
      <span className="text-xs font-semibold capitalize tracking-wide">{sentiment}</span>
    </motion.div>
  );
};
