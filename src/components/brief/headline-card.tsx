'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContentType } from '@/lib/types';

interface HeadlineCardProps {
  title?: string;
  contentType?: ContentType;
}

const TYPE_COLORS: Record<string, string> = {
  news: 'bg-type-news',
  tutorial: 'bg-type-tutorial',
  research: 'bg-type-research',
  docs: 'bg-type-docs',
  blog: 'bg-type-blog',
  other: 'bg-type-other',
};

export const HeadlineCard: React.FC<HeadlineCardProps> = ({ title, contentType }) => {
  if (!title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass w-full rounded-2xl p-8 mb-6 overflow-hidden relative"
    >
      {/* Type Indicator Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${contentType ? TYPE_COLORS[contentType] : 'bg-accent'}`} />
      
      <div className="flex flex-col gap-4">
        {contentType && (
          <span className={`inline-flex items-center self-start px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white ${TYPE_COLORS[contentType]}`}>
            {contentType}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-zinc-100">
          {title}
        </h1>
      </div>
    </motion.div>
  );
};
