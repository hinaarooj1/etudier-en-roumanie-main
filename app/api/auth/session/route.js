// app/api/auth/session/route.js
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  const user = await getCurrentUser(req);
  return NextResponse.json({ user });
}