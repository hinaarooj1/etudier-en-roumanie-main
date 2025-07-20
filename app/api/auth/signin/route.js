// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';
import { comparePassword, createToken, setAuthCookie } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

import crypto from 'crypto';

export async function POST(req) {
  try {
    let  { email, password } = await req.json();
    email = email.toLowerCase().trim();
    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const user = await prisma.customer.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        isVerified: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Email verification check
    if (!user.isVerified) {
      const verifyToken = crypto.randomBytes(32).toString('hex');
      const verifyTokenExpiry = new Date(Date.now() + 6400000); // ~2 hours

      await prisma.customer.update({
        where: { id: user.id },
        data: {
          verifyToken,
          verifyTokenExpiry,
        },
      });

      const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email/${verifyToken}`;
      const subject = 'Verify Your Email Address';
      const body = `
        <div>
          <h1>Email Verification</h1>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>The token will expire in 2 hours.</p>
        </div>
      `;

      try {
        await sendEmail(email, body, subject);
        return NextResponse.json(
          {
            error: 'Please verify your email first. A new verification link has been sent.',
            success: true
          },
          { status: 401 }
        );
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        return NextResponse.json(
          {
            error: 'Failed to send verification email. Please try again later.',
            success: false
          },
          { status: 500 }
        );
      }
    }

    // Create JWT token
    const token = createToken({ id: user.id });
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.firstname + ' ' + user.lastname,
        }
      },
      { status: 200 }
    );

    // Set auth cookie
    await setAuthCookie(response, token);

    return response;

  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}