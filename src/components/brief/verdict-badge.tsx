'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Verdict } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface VerdictBadgeProps {
  verdict?: Verdict;
}

const VERDICT_STYLES: Record<string, string> = {
  'Worth It': 'bg-green-500 hover:bg-green-600 shadow-green-500/20',
  'Skim It': 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20 text-yellow-950',
  'Skip It': 'bg-red-500 hover:bg-red-600 shadow-red-500/20',
};

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict }) => {
  if (!verdict) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: 'spring',
        damping: 12,
        stiffness: 200,
        delay: 0.5
      }}
    >
      <Badge className={`px-6 py-2 rounded-full text-white font-black text-xl md:text-2xl uppercase tracking-tighter shadow-2xl border-none ${VERDICT_STYLES[verdict]}`}>
        {verdict}
      </Badge>
    </motion.div>
  );
};
