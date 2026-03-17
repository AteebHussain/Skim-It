import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { fetchArticleContent } from '@/lib/fetcher';
import { briefSchema } from '@/lib/schemas';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { rateLimit } from '@/lib/limiter';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  console.log('[API/Brief] Request received');
  
  if (!apiKey) {
    console.error('[API/Brief] CRITICAL: Missing API Key (GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY)');
    return new Response('API Key not configured', { status: 500 });
  }

  try {
    // 1. Parse and Validate Input
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('[API/Brief] Failed to parse JSON body');
      return new Response('Invalid JSON', { status: 400 });
    }

    const { url } = body;
    if (!url || typeof url !== 'string') {
      console.error('[API/Brief] Missing URL in body');
      return new Response('Invalid URL', { status: 400 });
    }

    console.log(`[API/Brief] Processing URL: ${url}`);

    // 2. Rate Limiting (Simple IP-based)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'localhost';
    const limitResult = rateLimit(ip, 15, 60000); 

    if (!limitResult.success) {
      console.warn(`[API/Brief] Rate limit exceeded for IP: ${ip}`);
      return new Response('Too many requests. Please try again in a minute.', { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limitResult.limit.toString(),
          'X-RateLimit-Remaining': limitResult.remaining.toString(),
          'X-RateLimit-Reset': limitResult.reset.toString(),
        }
      });
    }

    // 3. Fetch Article Content
    console.log(`[API/Brief] Fetching content...`);
    const { content, source } = await fetchArticleContent(url);
    console.log(`[API/Brief] Content fetched via ${source}. Length: ${content.length}`);

    // 4. Initialize Gemini Stream
    console.log(`[API/Brief] Starting AI stream...`);
    const result = streamObject({
      model: google('gemini-1.5-flash'),
      schema: briefSchema,
      system: SYSTEM_PROMPT,
      prompt: `Analyze the following content and provide a visual brief:\n\n${content}`,
      onFinish: (event) => {
        console.log('[API/Brief] Stream finished. Usage:', event.usage);
      },
      onError: (err) => {
        console.error('[API/Brief] Stream error:', err);
      }
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[API/Brief] Top-level Error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
