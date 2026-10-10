import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Define a type for the rate limit result to keep it independent
export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

// Create a mock rate limiter for local development
const mockRateLimit = async (): Promise<RateLimitResult> => ({
  success: true,
  limit: 100,
  remaining: 99,
  reset: Date.now() + 10000,
});

// Initialize Upstash Redis and Ratelimit only if credentials exist
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Create a new ratelimiter, that allows 10 requests per 10 seconds
    ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      /**
       * Optional prefix for the keys used in redis. This is useful if you want to share a redis
       * instance with other applications and want to avoid key collisions. The default prefix is
       * "@upstash/ratelimit"
       */
      prefix: '@upstash/ratelimit',
    });
  } catch (error) {
    console.error('Failed to initialize Upstash Ratelimit:', error);
  }
}

/**
 * Validates the rate limit for a given identifier (usually IP address).
 * Defaults to mock success if Upstash credentials are not configured.
 *
 * @param identifier - The unique identifier to rate limit (e.g., IP address).
 * @returns RateLimitResult indicating if the request is allowed.
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  if (!ratelimit) {
    // If we're not running with a configured ratelimit instance, mock success
    return mockRateLimit();
  }

  try {
    const result = await ratelimit.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // Fail open if the rate limiter throws an error to avoid dropping traffic
    console.error('Rate limiting error:', error);
    return mockRateLimit();
  }
}
