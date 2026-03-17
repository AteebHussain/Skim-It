export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory store for rate limiting
// Note: In Vercel serverless functions, this is per-instance.
// For a production-ready global rate limit, consider Redis (Upstash).
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(ip: string, limit: number = 5, windowMsIndex: number = 60000): RateLimitResult {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Reset if window has passed
  if (now - userData.lastReset > windowMsIndex) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count++;
  rateLimitMap.set(ip, userData);

  const success = userData.count <= limit;
  const remaining = Math.max(0, limit - userData.count);
  const reset = userData.lastReset + windowMsIndex;

  return {
    success,
    limit,
    remaining,
    reset,
  };
}
