// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';

import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req) {
  try {
    let  { email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      placeOfResidence,
      passportNumber, phone
      
    } = await req.json(); 
email = email.toLowerCase().trim();
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !placeOfResidence || !passportNumber || !phone) {
      return NextResponse.json(
        { error: 'All the fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 6400000); // 1 hour 

    const user = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone:phone,
        dateOfBirth: new Date(dateOfBirth),
        placeOfResidence,
        passportNumber,
        verifyToken,
        verifyTokenExpiry,
        isAdmin: false
      },
    });

    // Send verification email

    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email/${verifyToken}`;
    let subject = 'Verify Your Email Address'
    let body =
      `
      <div>
        <h1>Email Verification</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>The token will be expired in 2 hours.</p>
      </div>
    `

    try {
      await sendEmail(email, body, subject);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);

      // Optional: You can delete the user here to avoid unverified accounts
      // await prisma.customer.delete({ where: { id: user.id } });

      return NextResponse.json(
        {
          user: { id: user.id, email: user.email, name: user.name },
          message:
            'Sign-up was successful, but we were unable to send a verification email. Please sign in and request a new verification link.',
          success: true,
        },
        { status: 201 }
      );
    }

    const response = NextResponse.json(
      {
        user: { id: user.id, email: user.email, name: user.name },
        message: 'Sign up successful! Please check your email to verify your account.',
        success: true
      },
      { status: 201 }
    );

    return response;
  } catch (error) { 
    console.log('error: ', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}