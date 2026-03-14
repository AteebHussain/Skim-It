'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl px-4"
    >
      <div className="relative flex items-center gap-2 rounded-2xl bg-zinc-900/50 p-2 border border-zinc-800 focus-within:border-accent transition-all duration-300 shadow-2xl backdrop-blur-sm">
        <div className="flex-1 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-zinc-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <input
            type="url"
            placeholder="Paste any URL — article, research, docs..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 text-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="group relative flex items-center gap-2 h-12 px-6 rounded-xl bg-accent text-white font-medium hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </div>
          ) : (
            <>
              <span>Skim It</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};
