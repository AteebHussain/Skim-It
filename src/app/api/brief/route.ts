import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { fetchArticleContent } from '@/lib/fetcher';
import { briefSchema } from '@/lib/schemas';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { rateLimit } from '@/lib/limiter';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Parse and Validate Input
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return new Response('Invalid URL', { status: 400 });
    }

    // 2. Rate Limiting (Simple IP-based)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
    const limitResult = rateLimit(ip, 10, 60000); // Increased to 10 for safety during testing

    if (!limitResult.success) {
      return new Response('Too many requests. Please try again in a minute.', { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limitResult.limit.toString(),
          'X-RateLimit-Remaining': limitResult.remaining.toString(),
          'X-RateLimit-Reset': limitResult.reset.toString(),
        }
      });
    }

    // 3. Fetch Article Content (Phase 2)
    console.log(`[API/Brief] Fetching content for: ${url}`);
    const { content, source } = await fetchArticleContent(url);
    console.log(`[API/Brief] Content fetched via ${source}. Length: ${content.length}`);

    // 4. Initialize Gemini Stream (Phase 3)
    const result = streamObject({
      model: google('gemini-1.5-flash'),
      schema: briefSchema,
      system: SYSTEM_PROMPT,
      prompt: `Analyze the following content and provide a visual brief:\n\n${content}`,
      onFinish: (event) => {
        console.log('[API/Brief] Stream finished. Usage:', event.usage);
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[API/Brief] Error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(message, {
      status: 500,
    });
  }
}
