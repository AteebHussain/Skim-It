'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InsightItem } from '@/lib/types';

interface InsightCardProps {
  insight: InsightItem;
  index: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15, // Staggered entry
        ease: 'easeOut' 
      }}
      className="glass w-full rounded-2xl p-6 border-l-4 border-l-accent/50"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
            {index + 1}
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {insight.title}
          </h3>
        </div>
        <p className="text-zinc-400 leading-relaxed text-sm">
          {insight.content}
        </p>
      </div>
    </motion.div>
  );
};
