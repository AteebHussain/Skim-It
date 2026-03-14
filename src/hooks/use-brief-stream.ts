import { experimental_useObject as useObject } from '@ai-sdk/react';
import { briefSchema } from '@/lib/schemas';
import { BriefData, StreamPhase } from '@/lib/types';
import { useState, useEffect } from 'react';

export function useBriefStream() {
  const [phase, setPhase] = useState<StreamPhase>('idle');
  
  const { object, submit, isLoading, error: streamError } = useObject({
    api: '/api/brief',
    schema: briefSchema,
  });

  useEffect(() => {
    if (isLoading) {
      setPhase('streaming');
    } else if (object) {
      setPhase('complete');
    } else if (streamError) {
      setPhase('error');
    }
  }, [isLoading, object, streamError]);

  const streamBrief = (url: string) => {
    setPhase('fetching');
    submit({ url });
  };

  return { 
    streamBrief, 
    phase, 
    data: object as Partial<BriefData> | null, 
    error: streamError?.message || null 
  };
}
