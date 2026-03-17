'use client';

import React from 'react';

interface DifficultyMeterProps {
  level?: number;
}

export const DifficultyMeter: React.FC<DifficultyMeterProps> = ({ level }) => {
  if (level === undefined) return null;

  const pct = level * 10;
  const label = level <= 3 ? 'Beginner' : level <= 6 ? 'Intermediate' : level <= 8 ? 'Advanced' : 'Expert';
  const barColor = level <= 3
    ? 'from-emerald-900 to-emerald-500'
    : level <= 6
    ? 'from-amber-900 to-amber-500'
    : 'from-red-950 to-red-500';

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Bar */}
      <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: '#1E1E1E' }}>
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-[width] duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Labels */}
      <div
        className="flex justify-between items-center text-[10px] font-bold tracking-[0.14em] uppercase"
        style={{ color: '#444444', fontFamily: 'var(--font-body)' }}
      >
        <span>Beginner</span>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{
            background: 'rgba(255,255,255,0.04)',
            color: '#888888',
            border: '1px solid #2a2a2a',
          }}
        >
          {label}
        </span>
        <span>Expert</span>
      </div>
    </div>
  );
};