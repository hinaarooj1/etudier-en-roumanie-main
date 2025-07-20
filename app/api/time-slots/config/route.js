// app/api/time-slots/config/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const config = await prisma.timeSlotConfig.findFirst();
    return NextResponse.json(config || null);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch time slot configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.startTime || !body.endTime || !body.interval) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingConfig = await prisma.timeSlotConfig.findFirst();
    
    let config;
    if (existingConfig) {
      config = await prisma.timeSlotConfig.update({
        where: { id: existingConfig.id },
        data: body
      });
    } else {
      config = await prisma.timeSlotConfig.create({
        data: body
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save time slot configuration' },
      { status: 500 }
    );
  }
}