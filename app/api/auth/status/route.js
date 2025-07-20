// app/api/auth/status/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const isLoggedIn = !!cookieStore.get('auth-token')?.value;
  return NextResponse.json({ isLoggedIn });
}