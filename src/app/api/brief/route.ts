import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { auth } from '@clerk/nextjs/server';
import { fetchArticleContent } from '@/lib/fetcher';
import { briefSchema } from '@/lib/schemas';
import { SYSTEM_PROMPT } from '@/lib/prompts';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // 1. Auth Check
    const { userId } = await auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Parse and Validate Input
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return new Response('Invalid URL', { status: 400 });
    }

    // 3. Fetch Article Content (Phase 2)
    const { content } = await fetchArticleContent(url);

    // 4. Initialize Gemini Stream (Phase 3)
    const result = streamObject({
      model: google('gemini-1.5-flash'),
      schema: briefSchema,
      system: SYSTEM_PROMPT,
      prompt: `Analyze the following content and provide a visual brief:\n\n${content}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[API/Brief] Error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
