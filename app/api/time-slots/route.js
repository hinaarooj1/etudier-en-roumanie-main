// app/api/time-slots/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper functions
function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function generateTimeSlots(start, end, interval) {
    const slots = [];
    let current = convertTimeToMinutes(start);
    const endMinutes = convertTimeToMinutes(end);

    while (current <= endMinutes) {
        const hours = Math.floor(current / 60);
        const mins = current % 60;
        slots.push(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`);
        current += interval;
    }

    return slots;
}

function normalizeDate(date) {
    // Normalize date to UTC midnight for accurate comparison
    const d = new Date(date);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    try {
        // 1. Handle date parameter
        let selectedDate;
        try {
            selectedDate = dateParam ? new Date(dateParam) : new Date();
            if (isNaN(selectedDate.getTime())) throw new Error('Invalid date');

            // Normalize the selected date (ignore time portion)
            selectedDate = normalizeDate(selectedDate);
        } catch (e) {
            return new Response(JSON.stringify({
                error: 'Invalid date format. Use YYYY-MM-DD'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Get configuration
        let config = await prisma.timeSlotConfig.findFirst();
        if (!config) {
            config = {
                startTime: "09:00",
                endTime: "17:00",
                interval: 30
            };
        }

        // 3. Generate all time slots
        const allSlots = generateTimeSlots(config.startTime, config.endTime, config.interval);

        // 4. Get disabled slots with proper date handling
        let disabledSlots = [];
        try {
            const dayOfWeek = selectedDate.getUTCDay(); // Use UTC day for consistency

            disabledSlots = await prisma.disabledSlot.findMany({
                where: {
                    OR: [
                        // Specific date matches (date-only comparison)
                        {
                            date: {
                                equals: selectedDate
                            },
                            isRecurring: false
                        },
                        // Recurring slots for this day of week
                        {
                            isRecurring: true,
                            dayOfWeek: dayOfWeek
                        }
                    ]
                }
            });
        } catch (disabledError) {
        }

        // 5. Filter available slots with precise comparison
        const availableSlots = allSlots.filter(slot => {
            const slotTime = convertTimeToMinutes(slot);

            return !disabledSlots.some(disabled => {
                // Only apply if:
                // - It's a recurring slot for today's day of week, OR
                // - It's a specific date slot matching exactly today
                const isApplicable =
                    (disabled.isRecurring && disabled.dayOfWeek === selectedDate.getUTCDay()) ||
                    (!disabled.isRecurring && normalizeDate(disabled.date).getTime() === selectedDate.getTime());

                if (!isApplicable) return false;

                const start = convertTimeToMinutes(disabled.startTime);
                const end = convertTimeToMinutes(disabled.endTime);
                return slotTime >= start && slotTime <= end;
            });
        });

        // 6. Return successful response
        return new Response(JSON.stringify({
            availableSlots,
            allSlots,
            date: selectedDate.toISOString().split('T')[0] // Return normalized date
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Failed to fetch time slots',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}