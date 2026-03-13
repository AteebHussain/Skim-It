import * as cheerio from 'cheerio';

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
};

const FETCH_TIMEOUT = 10000; // 10 seconds
const JINA_TIMEOUT = 15000;  // 15 seconds
const MIN_CONTENT_LENGTH = 100;

export interface FetchResult {
  content: string;
  source: 'primary' | 'jina';
}

/**
 * Main entry point to fetch and clean article content from a URL.
 * Implements a dual-path approach with primary fetch and Jina Reader fallback.
 */
export async function fetchArticleContent(url: string): Promise<FetchResult> {
  try {
    // 1. Primary Fetch Attempt
    const primaryHtml = await primaryFetch(url);
    const extractedContent = extractContentWithCheerio(primaryHtml);

    if (extractedContent.length >= MIN_CONTENT_LENGTH) {
      return { content: extractedContent, source: 'primary' };
    }

    console.log(`[Fetcher] Primary fetch content too short (${extractedContent.length}), falling back to Jina...`);
  } catch (error) {
    console.warn(`[Fetcher] Primary fetch failed for ${url}:`, error instanceof Error ? error.message : error);
  }

  // 2. Jina Reader Fallback Attempt
  try {
    const jinaContent = await jinaFetch(url);
    if (jinaContent.length >= MIN_CONTENT_LENGTH) {
      return { content: jinaContent, source: 'jina' };
    }
  } catch (error) {
    console.error(`[Fetcher] Jina fallback failed for ${url}:`, error instanceof Error ? error.message : error);
  }

  throw new Error('Could not extract meaningful content from this URL. It might be blocked, paywalled, or require JavaScript.');
}

/**
 * Fetches raw HTML using standard fetch with browser-like headers.
 */
async function primaryFetch(url: string): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: BROWSER_HEADERS,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('text/html')) {
      throw new Error(`Invalid content type: ${contentType}. Expected text/html.`);
    }

    return await response.text();
  } finally {
    clearTimeout(id);
  }
}

/**
 * Strips HTML noise and extracts readable text content using Cheerio.
 */
function extractContentWithCheerio(html: string): string {
  const $ = cheerio.load(html);

  // Remove noise
  $('script, style, noscript, iframe, nav, footer, header, ads, aside, .sidebar, .ads, .comments').remove();

  // Target common content areas
  let content = '';
  const selectors = ['article', 'main', '.content', '.article-content', '#content', 'body'];

  for (const selector of selectors) {
    const element = $(selector);
    if (element.length > 0) {
      // Get text but preserve some structure (newlines between blocks)
      content = element.find('p, h1, h2, h3, h4, li')
        .map((_, el) => $(el).text().trim())
        .get()
        .join('\n\n');
      
      if (content.length > MIN_CONTENT_LENGTH) break;
    }
  }

  // Final fallback if specific elements didn't yield enough
  if (content.length < MIN_CONTENT_LENGTH) {
    content = $('body').text().trim().replace(/\s+/g, ' ');
  }

  return content;
}

/**
 * Fetches content via Jina Reader API (r.jina.ai).
 */
async function jinaFetch(url: string): Promise<string> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), JINA_TIMEOUT);

  try {
    const response = await fetch(jinaUrl, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Jina API error: ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(id);
  }
}
