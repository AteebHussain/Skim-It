'use client';

import { UrlInput } from '@/components/url-input';
import { 
  HeadlineCard, 
  InsightCard, 
  SentimentTag, 
  DifficultyMeter, 
  VerdictBadge 
} from '@/components/brief';
import { useBriefStream } from '@/hooks/use-brief-stream';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { streamBrief, phase, data, error } = useBriefStream();

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-32 px-4 selection:bg-primary/30">
      <header className="mb-16 text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-tighter text-foreground"
        >
          SKIM<span className="text-primary underline decoration-4 underline-offset-8">IT</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground font-medium"
        >
          Paste any link. Get the absolute core in seconds.
        </motion.p>
      </header>

      <section className="w-full max-w-2xl mb-16 flex justify-center">
        <UrlInput onSubmit={streamBrief} isLoading={phase === 'fetching' || phase === 'streaming'} />
      </section>

      <main className="w-full max-w-2xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center text-sm font-medium shadow-sm"
            >
              {error}
            </motion.div>
          )}

          {phase === 'idle' && !error && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground font-medium text-center"
            >
              Paste a URL above and watch the brief build itself.
            </motion.p>
          )}

          {(phase === 'streaming' || phase === 'complete') && data && (
            <div key="brief" className="w-full space-y-6">
              <HeadlineCard title={data.title} contentType={data.contentType} />
              
              <div className="grid gap-4">
                {data.insights?.map((insight, idx) => (
                  <InsightCard key={idx} insight={insight} index={idx} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-border mt-8">
                <div className="flex flex-col gap-6 flex-1">
                  <SentimentTag sentiment={data.sentiment} />
                  <DifficultyMeter level={data.difficulty} />
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center min-w-[150px]">
                  <VerdictBadge verdict={data.verdict} />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-8 text-center">
         <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-[0.2em]">
           Powered by Gemini 2.5 Flash • No filler engineering
         </p>
      </footer>
    </div>
  );
}
