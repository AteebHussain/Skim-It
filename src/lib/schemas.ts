import { z } from 'zod';

export const CONTENT_TYPES = ['news', 'tutorial', 'research', 'docs', 'blog', 'other'] as const;
export const SENTIMENTS = ['positive', 'neutral', 'negative', 'analytical', 'critical'] as const;
export const VERDICTS = ['Worth It', 'Skim It', 'Skip It'] as const;
export const BIAS_TYPES = ['Neutral', 'Opinion', 'Marketing', 'Academic', 'Advocacy'] as const;

export const insightSchema = z.object({
  title: z.string().describe('The headline of the insight.'),
  content: z.string().describe('A detailed but concise explanation of the insight.'),
});

export const briefSchema = z.object({
  title: z.string().describe('The main title of the article.'),
  contentType: z.enum(CONTENT_TYPES).describe('The primary category of the content.'),
  insights: z.array(insightSchema).length(3).describe('Three distinct, high-value takeaways from the content.'),
  sentiment: z.enum(SENTIMENTS).describe('The overall tone or mood of the article.'),
  difficulty: z.number().min(1).max(10).describe('Complexity score from 1 (easy) to 10 (highly technical).'),
  verdict: z.enum(VERDICTS).describe('A final recommendation for the reader.'),
  estimatedReadTime: z.string().describe('Estimated time to read the full article (e.g., "5 mins").'),
  tags: z.array(z.string()).describe('List of 3-5 topic categories.'),
  keyTerms: z.array(z.string()).describe('List of 3-5 important people, places, or technical terms.'),
  tldr: z.string().describe('A single, powerful sentence summarizing the core value proposition.'),
  keyTakeaway: z.string().describe('A final, actionable takeaway or "how to use this" advice.'),
  bias: z.enum(BIAS_TYPES).describe('The editorial stance of the content.'),
  prerequisite: z.string().describe('A single short sentence describing what background knowledge the reader needs before reading this. E.g. "Basic knowledge of React hooks" or "No prerequisites — written for general audiences".'),
});

export type InsightItem = z.infer<typeof insightSchema>;
export type BriefData = z.infer<typeof briefSchema>;
export type ContentType = (typeof CONTENT_TYPES)[number];
export type Sentiment = (typeof SENTIMENTS)[number];
export type Verdict = (typeof VERDICTS)[number];
export type BiasType = (typeof BIAS_TYPES)[number];