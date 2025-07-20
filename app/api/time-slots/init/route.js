// app/api/time-slots/init/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check if config exists
    const existingConfig = await prisma.timeSlotConfig.findFirst();
    
    if (!existingConfig) {
      // Create default configuration
      const defaultConfig = await prisma.timeSlotConfig.create({
        data: {
          startTime: "09:00",
          endTime: "17:00",
          interval: 30,
          isActive: true
        }
      });
      return NextResponse.json({ 
        message: 'Default configuration created',
        config: defaultConfig 
      });
    }
    
    return NextResponse.json({ 
      message: 'Configuration already exists',
      config: existingConfig 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initialize configuration' },
      { status: 500 }
    );
  }
}