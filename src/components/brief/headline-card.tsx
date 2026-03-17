'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContentType } from '@/lib/types';

interface HeadlineCardProps {
  title?: string;
  contentType?: ContentType;
}

const TYPE_THEME: Record<string, {
  label: string;
  bg: string;
  border: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  accentBar: string;
}> = {
  tutorial: {
    label: 'Tutorial',
    bg: 'linear-gradient(135deg, rgba(230,57,70,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(230,57,70,0.2)',
    badgeBg: 'rgba(230,57,70,0.08)',
    badgeColor: '#E63946',
    badgeBorder: 'rgba(230,57,70,0.25)',
    accentBar: '#E63946',
  },
  news: {
    label: 'News',
    bg: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(251,191,36,0.2)',
    badgeBg: 'rgba(251,191,36,0.08)',
    badgeColor: '#FBBF24',
    badgeBorder: 'rgba(251,191,36,0.25)',
    accentBar: '#FBBF24',
  },
  research: {
    label: 'Research',
    bg: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(139,92,246,0.2)',
    badgeBg: 'rgba(139,92,246,0.08)',
    badgeColor: '#8B5CF6',
    badgeBorder: 'rgba(139,92,246,0.25)',
    accentBar: '#8B5CF6',
  },
  docs: {
    label: 'Docs',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(59,130,246,0.2)',
    badgeBg: 'rgba(59,130,246,0.08)',
    badgeColor: '#3B82F6',
    badgeBorder: 'rgba(59,130,246,0.25)',
    accentBar: '#3B82F6',
  },
  blog: {
    label: 'Blog',
    bg: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(20,184,166,0.2)',
    badgeBg: 'rgba(20,184,166,0.08)',
    badgeColor: '#14B8A6',
    badgeBorder: 'rgba(20,184,166,0.25)',
    accentBar: '#14B8A6',
  },
  other: {
    label: 'Article',
    bg: 'linear-gradient(135deg, rgba(113,113,122,0.08) 0%, rgba(18,18,18,1) 60%)',
    border: 'rgba(113,113,122,0.2)',
    badgeBg: 'rgba(113,113,122,0.08)',
    badgeColor: '#71717A',
    badgeBorder: 'rgba(113,113,122,0.25)',
    accentBar: '#71717A',
  },
};

const shimmer = {
  background: 'linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
};

export const HeadlineCard: React.FC<HeadlineCardProps> = ({ title, contentType }) => {
  const theme = TYPE_THEME[contentType ?? 'other'] ?? TYPE_THEME.other;

  // Skeleton state — card is always rendered, content fills in
  if (!title) {
    return (
      <div style={{
        width: '100%',
        borderRadius: '18px',
        border: '1px solid #222',
        background: '#141414',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        {/* Badge skeleton */}
        <div style={{ width: '72px', height: '22px', borderRadius: '999px', ...shimmer }} />
        {/* Title skeleton lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ width: '90%', height: '22px', borderRadius: '6px', ...shimmer }} />
          <div style={{ width: '65%', height: '22px', borderRadius: '6px', ...shimmer }} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: '100%',
        borderRadius: '18px',
        border: `1px solid ${theme.border}`,
        background: theme.bg,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '3px', height: '100%',
        background: theme.accentBar,
        borderRadius: '18px 0 0 18px',
        opacity: 0.7,
      }} />

      {/* Badge */}
      {contentType && (
        <span style={{
          alignSelf: 'flex-start',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          color: theme.badgeColor,
          background: theme.badgeBg,
          border: `1px solid ${theme.badgeBorder}`,
        }}>
          {theme.label}
        </span>
      )}

      {/* Title */}
      <h1 style={{
        fontFamily: '"DM Sans", var(--font-body), system-ui, sans-serif',
        fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        color: '#F0F0F0',
        margin: 0,
      }}>
        {title}
      </h1>
    </motion.div>
  );
};