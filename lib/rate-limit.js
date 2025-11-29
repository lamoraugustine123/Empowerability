import { NextResponse } from 'next/server';

// Simple in-memory rate limiting
const requestCounts = new Map();

export function rateLimit(identifier, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean up old entries
  for (const [key, timestamps] of requestCounts.entries()) {
    const validTimestamps = timestamps.filter(time => time > windowStart);
    if (validTimestamps.length === 0) {
      requestCounts.delete(key);
    } else {
      requestCounts.set(key, validTimestamps);
    }
  }
  
  // Check current rate
  const userRequests = requestCounts.get(identifier) || [];
  const recentRequests = userRequests.filter(time => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return {
      limited: true,
      remaining: 0,
      resetTime: new Date(windowStart + windowMs)
    };
  }
  
  // Add current request
  recentRequests.push(now);
  requestCounts.set(identifier, recentRequests);
  
  return {
    limited: false,
    remaining: limit - recentRequests.length,
    resetTime: new Date(now + windowMs)
  };
}

// Rate limit middleware for API routes
export function withRateLimit(handler, options = {}) {
  return async (request, context) => {
    const identifier = request.ip || 'anonymous';
    const limit = options.limit || 5;
    const windowMs = options.windowMs || 15 * 60 * 1000;
    
    const rateLimitInfo = rateLimit(identifier, limit, windowMs);
    
    if (rateLimitInfo.limited) {
      return NextResponse.json(
        { 
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(rateLimitInfo.resetTime / 1000).toString()
          }
        }
      );
    }
    
    // Add rate limit headers to response
    const response = await handler(request, context);
    
    if (response) {
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitInfo.remaining.toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(rateLimitInfo.resetTime / 1000).toString());
    }
    
    return response;
  };
}
