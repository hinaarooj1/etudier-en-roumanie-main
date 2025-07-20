import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";

// 


export async function GET(req) {
    try {
        // Verify admin session
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get("session");

        if (!sessionCookie?.value) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const session = await decrypt(sessionCookie.value);

        if (!session?.userId) {
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }

        // Check if user is admin

        // Get all appointments
        const appointments = await prisma.reservation.findMany({
            orderBy: [
                { date: "asc" },
                { time: "asc" }
            ],
            select: {
                id: true,
                userId: true,
                email: true,
                name: true,
                date: true,
                time: true,
                phone: true,
                status: true,
                manageToken: true,
                createdAt: true,
                updatedAt: true,
                cancelledAt: true,
                completedAt: true
            }
        });

        return NextResponse.json({
            success: true,
            data: appointments
        });

    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch appointments",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}



