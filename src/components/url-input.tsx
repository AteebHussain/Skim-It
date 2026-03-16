'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, LinkIcon } from 'lucide-react';

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
      <div className="relative flex items-center gap-2 rounded-2xl bg-card p-2 border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-300 shadow-2xl backdrop-blur-sm">
        <div className="flex-1 flex items-center pl-3">
          <LinkIcon className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <Input
            type="url"
            placeholder="Paste any URL — article, research, docs..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="w-full bg-transparent border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-lg h-12"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="group h-12 px-6 rounded-xl font-medium transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Skim It
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};
