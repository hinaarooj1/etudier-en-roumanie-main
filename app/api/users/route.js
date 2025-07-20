import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const users = await prisma.customer.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        placeOfResidence: true,
        passportNumber: true,
        phone: true,
        isVerified: true,
        isAdmin: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { email, password, firstName, isAdmin, lastName, dateOfBirth, placeOfResidence, passportNumber } = await req.json();

    const hashedPassword = await hashPassword(password);

    const user = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        placeOfResidence: true,
        passportNumber: true,
        phone: true,
        isAdmin,
        isVerified: true // Bypass verification for admin-created users
      }
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await prisma.customer.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}