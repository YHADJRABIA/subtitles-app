import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { ipAddress } from '@vercel/functions'
import { APIResponse } from '@/types/api'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(25, '25s'),
})

export async function checkRateLimit(
  req: NextRequest
): Promise<NextResponse<APIResponse> | null> {
  const ip = ipAddress(req) ?? '127.0.0.1'

  const { limit, reset, remaining } = await ratelimit.limit(ip)

  if (remaining === 0) {
    return NextResponse.json(
      { message: 'Too many API calls', success: false, status: 429 },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    )
  }

  return null
}
