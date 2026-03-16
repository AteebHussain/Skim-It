'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InsightItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

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
      className="w-full"
    >
      <Card className="rounded-2xl border-l-4 border-l-primary/50 bg-card border-border backdrop-blur-md shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {insight.title}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {insight.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

