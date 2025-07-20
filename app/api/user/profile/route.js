// app/api/user/route.js
import { getAuthToken, verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get the token from cookies
    const token = getAuthToken(request);

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401
      });
    }

    // Fetch the user from database
    const user = await prisma.customer.findUnique({
      where: { id: decoded.id },
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
        createdAt: true,
        // avatar: true
      }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data: user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// app/api/user/route.js


export async function PUT(request) {
  try {
    const token = getAuthToken(request);
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401
      });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401
      });
    }

    let  { firstName, lastName, email, dateOfBirth, placeOfResidence, passportNumber, phone } = await request.json();
    email = email.toLowerCase().trim();
    // Validate input
    if (!firstName || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400
      });
    }

    const updatedUser = await prisma.customer.update({
      where: { id: decoded.id },
      data: { firstName, email, lastName, dateOfBirth, placeOfResidence, passportNumber, phone },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        placeOfResidence: true,
        passportNumber: true,
        phone: true,
        email: true,
        isVerified: true,
        createdAt: true
      }
    });

    return new Response(JSON.stringify({ data: updatedUser }), {
      status: 200
    });

  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    });
  }
}
