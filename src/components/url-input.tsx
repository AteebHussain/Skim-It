'use client';

import React, { useState } from 'react';
import { Loader2, ArrowRight, LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading, compact = false }) => {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: compact ? '8px' : '10px',
          borderRadius: compact ? '12px' : '14px',
          padding: compact ? '6px 6px 6px 14px' : '10px 10px 10px 20px',
          background: '#111111',
          border: `1px solid ${focused ? 'rgba(230,57,70,0.5)' : '#242424'}`,
          boxShadow: focused ? '0 0 0 3px rgba(230,57,70,0.08)' : 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <LinkIcon
          style={{
            color: focused ? '#E63946' : '#444444',
            width: compact ? '14px' : '16px',
            height: compact ? '14px' : '16px',
            flexShrink: 0,
            transition: 'color 0.2s ease',
          }}
        />
        <input
          type="url"
          placeholder="Paste any URL — article, research, docs..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F0F0F0',
            caretColor: '#E63946',
            fontFamily: 'var(--font-body)',
            fontSize: compact ? '13px' : '14px',
            fontWeight: 400,
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: compact ? '8px 18px' : '10px 24px',
            borderRadius: compact ? '8px' : '10px',
            background: isLoading || !url.trim()
              ? '#1A1A1A'
              : 'linear-gradient(135deg, #E63946 0%, #c0303b 100%)',
            border: `1px solid ${isLoading || !url.trim() ? '#2A2A2A' : 'rgba(230,57,70,0.3)'}`,
            color: isLoading || !url.trim() ? '#444444' : '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: compact ? '13px' : '14px',
            fontWeight: 700,
            cursor: isLoading || !url.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
            flexShrink: 0,
            boxShadow: isLoading || !url.trim()
              ? 'none'
              : '0 2px 12px rgba(230,57,70,0.25)',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <span>Go</span>
              <ArrowRight style={{ width: '13px', height: '13px' }} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};