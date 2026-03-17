import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { fetchArticleContent } from '@/lib/fetcher';
import { briefSchema } from '@/lib/schemas';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { rateLimit } from '@/lib/limiter';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // 1. Parse and Validate Input
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return new Response('Invalid URL', { status: 400 });
    }

    // 2. Rate Limiting (Simple IP-based)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const limitResult = rateLimit(ip, 5, 60000); // 5 requests per minute

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
    const { content } = await fetchArticleContent(url);

    // 4. Initialize Gemini Stream (Phase 3)
    const result = streamObject({
      model: google('gemini-2.5-flash'),
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
