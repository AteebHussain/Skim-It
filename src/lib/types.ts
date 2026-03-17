import { CONTENT_TYPES, SENTIMENTS, VERDICTS, BIAS_TYPES } from './schemas';
import type { BriefData, InsightItem, ContentType, Sentiment, Verdict, BiasType } from './schemas';

export { CONTENT_TYPES, SENTIMENTS, VERDICTS, BIAS_TYPES };
export type { BriefData, InsightItem, ContentType, Sentiment, Verdict, BiasType };

export interface BriefCard {
  title: string;
  contentType: ContentType;
  insights: InsightItem[];
  sentiment: Sentiment;
  difficulty: number;
  verdict: Verdict;
  estimatedReadTime?: string;
  tags?: string[];
  keyTerms?: string[];
  tldr?: string;
  bias?: BiasType;
  prerequisite?: string;
}

export interface PartialBriefCard {
  title?: string;
  contentType?: ContentType;
  insights?: InsightItem[];
  sentiment?: Sentiment;
  difficulty?: number;
  verdict?: Verdict;
  estimatedReadTime?: string;
  tags?: string[];
  keyTerms?: string[];
  tldr?: string;
  bias?: BiasType;
  prerequisite?: string;
}

export type StreamPhase = 'idle' | 'fetching' | 'streaming' | 'complete' | 'error';