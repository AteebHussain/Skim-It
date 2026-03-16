import { experimental_useObject as useObject } from '@ai-sdk/react';
import { briefSchema } from '@/lib/schemas';
import { BriefData, StreamPhase } from '@/lib/types';

export function useBriefStream() {
  const { object, submit, isLoading, error: streamError } = useObject({
    api: '/api/brief',
    schema: briefSchema,
  });

  let phase: StreamPhase = 'idle';
  if (streamError) {
    phase = 'error';
  } else if (isLoading) {
    phase = object ? 'streaming' : 'fetching';
  } else if (object) {
    phase = 'complete';
  }

  const streamBrief = (url: string) => {
    submit({ url });
  };

  return { 
    streamBrief, 
    phase, 
    data: object as Partial<BriefData> | null, 
    error: streamError?.message || null 
  };
}
