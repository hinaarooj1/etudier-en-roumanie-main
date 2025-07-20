// app/api/time-slots/disabled/route.js
// app/api/time-slots/disabled/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const disabledSlots = await prisma.disabledSlot.findMany({
      orderBy: [{ isRecurring: 'asc' }, { date: 'asc' }]
    });
    return NextResponse.json(disabledSlots);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disabled slots' },
      { status: 500 }
    );
  }
}
 

export async function POST(request) {
  let body;
  try {
    body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.startTime || !body.endTime) {
      return NextResponse.json(
        { error: 'Missing required fields (startTime and endTime are required)' },
        { status: 400 }
      );
    }

    // Prepare data for Prisma
    const data = {
      startTime: body.startTime,
      endTime: body.endTime,
      isRecurring: Boolean(body.isRecurring),
      reason: body.reason || null,
      dayOfWeek: body.isRecurring ? Number(body.dayOfWeek) : null,
      date: body.isRecurring ? null : new Date(body.date)
    };
    
    console.log('[DEBUG] Creating disabled slot with data:', data);
    
    // Create the disabled slot
    const disabledSlot = await prisma.disabledSlot.create({
      data
    });

    console.log('[DEBUG] Successfully created disabled slot:', disabledSlot);

    return NextResponse.json(disabledSlot, { status: 200 });
    
  } catch (error) {
    // Handle specific Prisma errors
    if (error instanceof Error) {
      console.log('[ERROR] Failed to create disabled slot:', error.message);
      if (error.message.includes('Invalid `prisma.disabledSlot.create()` invocation')) {
        return NextResponse.json(
          { error: 'Database error', details: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to add disabled slot',
        details: error instanceof Error ? error.message : 'Unknown error',
        requestBody: body
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID parameter' },
        { status: 400 }
      );
    }

    await prisma.disabledSlot.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete disabled slot' },
      { status: 500 }
    );
  }
}