'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InsightItem } from '@/lib/types';

interface InsightCardProps {
  insight: InsightItem;
  index: number;
  compact?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, index, compact = false }) => {
  const hasContent = insight?.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.06 }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '14px',
        border: '1px solid #222222',
        background: '#141414',
        padding: compact ? '14px 20px' : '22px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: compact ? '8px' : '12px',
        justifyContent: 'center',
      }}
    >
      {hasContent ? (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{
              flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
              background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 800, color: '#E63946',
              fontFamily: 'var(--font-body)', marginTop: '1px',
            }}>
              {index + 1}
            </span>
            <h3 style={{
              fontFamily: '"DM Sans", var(--font-body), system-ui, sans-serif',
              fontSize: compact ? '0.88rem' : '1rem',
              fontWeight: 700, color: '#F0F0F0',
              lineHeight: 1.3, margin: 0, letterSpacing: '-0.005em',
            }}>
              {insight.title}
            </h3>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: compact ? '0.8rem' : '0.88rem',
            lineHeight: 1.7, color: '#777777',
            margin: 0, paddingLeft: '34px',
          }}>
            {(insight.content ?? '').split(/(`[^`]+`)/g).map((part, i) =>
              part.startsWith('`') && part.endsWith('`')
                ? <code key={i} className="inline-code">{part.slice(1, -1)}</code>
                : part
            )}
          </p>
        </>
      ) : (
        /* Skeleton */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1E1E1E', flexShrink: 0 }} />
            <div style={{ width: '60%', height: '14px', borderRadius: '4px', background: '#1E1E1E' }} />
          </div>
          <div style={{ paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ width: '100%', height: '11px', borderRadius: '4px', background: '#1A1A1A' }} />
            <div style={{ width: '80%', height: '11px', borderRadius: '4px', background: '#1A1A1A' }} />
          </div>
        </div>
      )}
    </motion.div>
  );
};