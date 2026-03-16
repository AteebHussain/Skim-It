'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContentType } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      className="w-full mb-6"
    >
      <Card className="rounded-2xl p-6 md:p-8 overflow-hidden relative shadow-xl bg-card border-border backdrop-blur-md">
        {/* Type Indicator Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${contentType ? TYPE_COLORS[contentType] : 'bg-primary'}`} />
        
        <CardHeader className="p-0 gap-4 flex flex-col">
          {contentType && (
            <Badge variant="secondary" className={`self-start px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white border-none ${TYPE_COLORS[contentType]}`}>
              {contentType}
            </Badge>
          )}
          <CardTitle className="text-3xl md:text-4xl leading-tight text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

