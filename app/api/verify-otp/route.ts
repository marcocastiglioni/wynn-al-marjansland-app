import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.API_BASE_URL}/api/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error: unknown) {
    console.error('[VERIFY OTP] Proxy Error:', error);
    return NextResponse.json({ error: '[VERIFY OTP] Error proxying request' }, { status: 500 });
  }
}
