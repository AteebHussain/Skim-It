'use client';
import React from 'react';
import { UrlInput } from '@/components/url-input';
import {
  HeadlineCard,
  InsightCard,
  DifficultyMeter,
  VerdictBadge
} from '@/components/brief';
import { useBriefStream } from '@/hooks/use-brief-stream';
import { motion, AnimatePresence } from 'framer-motion';


// ── Inline tooltip component ──
const InfoTooltip = ({ text }: { text: string }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          width: '16px', height: '16px', borderRadius: '50%',
          border: '1px solid #333', background: '#1A1A1A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'default',
          fontSize: '9px', fontWeight: 800, color: '#555',
          fontFamily: 'var(--font-body)',
          transition: 'border-color 0.15s, color 0.15s',
          ...(visible ? { borderColor: '#555', color: '#888' } : {}),
        }}
      >
        !
      </div>
      {visible && (
        <div style={{
          position: 'absolute', top: '22px', right: 0,
          width: '200px', zIndex: 50,
          background: '#1A1A1A', border: '1px solid #2E2E2E',
          borderRadius: '10px', padding: '10px 12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem',
            fontWeight: 400, color: '#AAAAAA',
            lineHeight: 1.55, margin: 0,
          }}>
            {text}
          </p>
          {/* Arrow */}
          <div style={{
            position: 'absolute', top: '-5px', right: '4px',
            width: '8px', height: '8px',
            background: '#1A1A1A', border: '1px solid #2E2E2E',
            borderRight: 'none', borderBottom: 'none',
            transform: 'rotate(45deg)',
          }} />
        </div>
      )}
    </div>
  );
};


export default function Home() {
  const { streamBrief, phase, data, error } = useBriefStream();
  const isDashboard = phase === 'streaming' || phase === 'complete' || (phase === 'fetching' && !!data);

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">

      {/* ═══════════ TOP BAR ═══════════ */}
      <motion.header
        layout
        className={`w-full flex transition-all duration-500 shrink-0 ${
          isDashboard
            ? 'flex-row items-center justify-between px-6 py-5 border-b border-[#1A1A1A] z-10'
            : 'flex-col items-center justify-end flex-1 pb-6 space-y-16'
        }`}
        style={isDashboard ? { background: '#0A0A0A' } : {}}
      >
        <motion.div layout className={isDashboard ? 'flex items-center gap-3 shrink-0' : 'text-center'}>
          <div className="flex items-center gap-3">
            <div className={`rounded-xl bg-primary flex items-center justify-center overflow-hidden ${isDashboard ? 'w-8 h-8' : 'w-16 h-16 md:w-20 md:h-20 mb-6'}`}>
              <img src="/favicon.png" alt="SkimIt Logo" className="w-full h-full object-cover" />
            </div>
            <motion.h1
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-black tracking-tighter text-foreground ${isDashboard ? 'text-xl' : 'text-6xl md:text-7xl mb-6'}`}
            >
              SKIM<span className="text-primary underline decoration-4 underline-offset-8">IT</span>
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
  layout
  className={`flex ${isDashboard ? '' : 'w-full max-w-[700px] px-4 flex-col items-center gap-6 mt-10'}`}
  style={isDashboard ? {
    width: 'calc(40% - 1px)',
    minWidth: '280px',
    flexShrink: 0,
    paddingLeft: '0px',
    paddingRight: '18px',
  } : {}}
>
          <UrlInput onSubmit={streamBrief} isLoading={phase === 'fetching' || phase === 'streaming'} compact={isDashboard} />
          {!isDashboard && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-medium text-lg md:text-xl text-center"
            >
              Paste any link. Get the absolute core in seconds.
            </motion.p>
          )}
        </motion.div>
      </motion.header>

      {/* ═══════════ MAIN ═══════════ */}
      <main
        className="w-full relative"
        style={{
          flex: 1,
          minHeight: 0,
          display: isDashboard ? 'flex' : 'flex',
          flexDirection: isDashboard ? 'row' : 'column',
          overflow: 'hidden',
        }}
      >
        {/* Idle error */}
        <AnimatePresence mode="popLayout">
          {error && !isDashboard && (
            <motion.div
              layout key="error"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full mx-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center text-sm font-medium shadow-sm mb-8"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── DASHBOARD ─── */}
        {isDashboard && data && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', minHeight: 0 }}
          >

            {/* ══ LEFT PANEL 60% — NO SCROLL, FILLS FULL HEIGHT ══ */}
<div style={{
  flex: '6 1 0%',
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '16px 36px 16px 48px',
  gap: '10px',
}}>

  {/* Headline — natural height, no shrink */}
  <div style={{ flexShrink: 0 }}>
    <HeadlineCard title={data.title} contentType={data.contentType} />
  </div>

  {/* Insight cards — each gets equal share of middle space */}
  <div style={{
    flex: '1 1 0%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }}>
    {(data.insights ?? [{}, {}, {}]).map((insight: any, idx: number) => (
      <div key={idx} style={{ flex: '1 1 0%', minHeight: 0 }}>
        <InsightCard insight={insight} index={idx} compact />
      </div>
    ))}
  </div>

  {/* Final Takeaway — stretches to fill remaining bottom space */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    style={{
      flex: '0 0 auto',
      borderRadius: '14px',
      padding: '14px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      background: 'linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(18,18,18,0.95) 70%)',
      border: '1px solid rgba(251,191,36,0.2)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '3px', height: '100%',
      background: '#FBBF24',
      borderRadius: '14px 0 0 14px',
      opacity: 0.8,
    }} />

    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '9px',
      fontWeight: 700, letterSpacing: '0.2em',
      textTransform: 'uppercase' as const, color: '#FBBF24',
    }}>
      ✦ Final Takeaway
    </span>

    {data.keyTakeaway ? (
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.85rem',
        fontWeight: 400, lineHeight: 1.65,
        color: '#C9982A', margin: 0, fontStyle: 'normal',
      }}>
        {data.keyTakeaway}
      </p>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
        {[100, 80, 50].map((w, i) => (
          <div key={i} style={{
            width: `${w}%`, height: '12px', borderRadius: '4px',
            background: 'rgba(251,191,36,0.08)',
          }} />
        ))}
      </div>
    )}
  </motion.div>

</div>

            {/* ── DIVIDER ── */}
            <div style={{ width: '1px', background: '#1A1A1A', flexShrink: 0 }} />

            {/* ══ RIGHT PANEL 40% — scrollable ══ */}
            <div style={{
              flex: '4 1 0%',
              minWidth: '280px',
              height: '100%',
              overflowY: 'auto',
              background: '#0D0D0D',
            }}>
              <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>

  {/* TL;DR */}
  {data.tldr && (
    <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>TL;DR</span>
        <InfoTooltip text="A single-sentence summary of the article's core value. Read this first to decide if you want to go deeper." />
      </div>
      <p style={{ color: '#BBBBBB', fontFamily: 'var(--font-body)', fontSize: '0.83rem', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>{data.tldr}</p>
    </div>
  )}

  {/* Verdict + Read Time */}
  {(data.verdict || data.estimatedReadTime) && (
    <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Verdict &amp; Read Time</span>
        <InfoTooltip text="Verdict is our recommendation on whether the article is worth your full attention. Read Time is the estimated time to read the complete original." />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        {data.verdict && <div style={{ flex: 1 }}><VerdictBadge verdict={data.verdict} /></div>}
        {data.estimatedReadTime && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#F0F0F0', lineHeight: 1, flexShrink: 0 }}>
            {data.estimatedReadTime}
          </span>
        )}
      </div>
    </div>
  )}

  {/* Complexity */}
  {data.difficulty !== undefined && (
    <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Complexity</span>
        <InfoTooltip text="Rates the technical depth of the content on a scale from Beginner to Expert. Higher complexity means more domain knowledge is assumed." />
      </div>
      <DifficultyMeter level={data.difficulty} />
    </div>
  )}

  {/* Bias + Prerequisite — side by side */}
  {(data.bias || data.prerequisite) && (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

      {data.bias && (
        <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 14px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Bias</span>
            <InfoTooltip text="The editorial stance of the content — whether it's neutral reporting, personal opinion, promotional, academic, or arguing for a cause." />
          </div>
          <span style={{
            alignSelf: 'flex-start',
            padding: '3px 10px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700,
            fontFamily: 'var(--font-body)',
            ...(data.bias === 'Neutral'   ? { color: '#60a5fa', background: 'rgba(96,165,250,0.08)',  border: '1px solid rgba(96,165,250,0.2)'  } :
                data.bias === 'Opinion'   ? { color: '#f97316', background: 'rgba(249,115,22,0.08)',  border: '1px solid rgba(249,115,22,0.2)'  } :
                data.bias === 'Marketing' ? { color: '#E63946', background: 'rgba(230,57,70,0.08)',   border: '1px solid rgba(230,57,70,0.2)'   } :
                data.bias === 'Academic'  ? { color: '#8B5CF6', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' } :
                                            { color: '#FBBF24', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }),
          }}>
            {data.bias}
          </span>
        </div>
      )}

      {data.prerequisite && (
        <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 14px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Prerequisite</span>
            <InfoTooltip text="What you should already know before reading this. Helps you gauge if you're the right audience for the content." />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 500, color: '#AAAAAA', lineHeight: 1.5, margin: 0 }}>
            {data.prerequisite}
          </p>
        </div>
      )}

    </div>
  )}

  {/* Topics + Key Terms */}
  {(data.tags?.length || data.keyTerms?.length) ? (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'start' }}>
      {data.tags && data.tags.length > 0 && (
        <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 14px', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Topics</span>
            <InfoTooltip text="The main subject areas and themes covered in the article. Useful for quickly categorizing what domain this content belongs to." />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
            {data.tags.map((tag: string) => (
              <span key={tag} style={{ padding: '3px 9px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(255,255,255,0.03)', border: '1px solid #2A2A2A', color: '#888', fontFamily: 'var(--font-body)', cursor: 'default' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.keyTerms && data.keyTerms.length > 0 && (
        <div style={{ background: '#141414', border: '1px solid #242424', borderRadius: '14px', padding: '16px 14px', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#444' }}>Key Terms</span>
            <InfoTooltip text="Important names, technologies, or concepts central to the article. Look these up if you want deeper context." />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
            {data.keyTerms.map((term: string, i: number) => (
              <span key={term} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '999px', background: '#1A1A1A', border: '1px solid #2A2A2A', fontSize: '10px', fontWeight: 600, color: '#888', fontFamily: 'var(--font-body)', cursor: 'default' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#242424', border: '1px solid #333', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 800, color: '#555', flexShrink: 0 }}>
                  {i + 1}
                </span>
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null}

  <div style={{ height: '16px' }} />
</div>
            </div>

          </motion.div>
        )}

        {/* Error toast */}
        <AnimatePresence>
          {error && isDashboard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-destructive text-destructive-foreground font-medium shadow-2xl flex items-center gap-3"
            >
              <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-white/20 text-white font-bold">!</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {!isDashboard && <footer className="absolute bottom-8 w-full text-center" />}
    </div>
  );
}