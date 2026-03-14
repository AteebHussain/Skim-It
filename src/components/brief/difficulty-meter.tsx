'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DifficultyMeterProps {
  level?: number;
}

export const DifficultyMeter: React.FC<DifficultyMeterProps> = ({ level }) => {
  if (level === undefined) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-zinc-500">
        <span>Complexity</span>
        <span className="text-zinc-300">Level {level}/10</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level * 10}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full bg-gradient-to-r from-accent to-blue-400 rounded-full"
        />
      </div>
    </div>
  );
};
