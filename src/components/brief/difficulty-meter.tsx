'use client';

import React from 'react';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';

interface DifficultyMeterProps {
  level?: number;
}

export const DifficultyMeter: React.FC<DifficultyMeterProps> = ({ level }) => {
  if (level === undefined) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
        <span>Complexity</span>
        <span className="text-foreground/70">Level {level}/10</span>
      </div>
      <Progress value={level * 10}>
        <ProgressTrack>
          <ProgressIndicator className="bg-gradient-to-r from-primary to-blue-500 transition-[width] duration-1000 ease-out" />
        </ProgressTrack>
      </Progress>
    </div>
  );
};
