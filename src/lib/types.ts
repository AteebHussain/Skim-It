import { CONTENT_TYPES, SENTIMENTS, VERDICTS } from './schemas';
import type { BriefData, InsightItem, ContentType, Sentiment, Verdict } from './schemas';

export { CONTENT_TYPES, SENTIMENTS, VERDICTS };
export type { BriefData, InsightItem, ContentType, Sentiment, Verdict };

export type StreamPhase = 'idle' | 'fetching' | 'streaming' | 'complete' | 'error';
