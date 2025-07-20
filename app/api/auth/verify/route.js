// app/api/auth/verify/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.customer.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    await prisma.customer.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}