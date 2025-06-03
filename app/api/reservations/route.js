import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('body: ', body);
    const { date, email, time, name } = body;

    // Validate required fields
    if (!date && !time) {
      return NextResponse.json(
        { error: "Date is required." },
        { status: 400 }
      );
    }

    // Create a new reservation
    const reservation = await prisma.reservation.create({
      data: {
        date,
        email,
        time,
        name,

      },
    });

    // Check if the session exists

    return NextResponse.json(
      { success: true, reservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Extract search parameters from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    console.log("Received search params:", searchParams);

    // Check if the session exists
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Please log in to delete a reservation." },
        { status: 401 }
      );
    }

    // Check if the id parameter is provided
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete the reservation." },
        { status: 400 }
      );
    }

    // Attempt to delete the reservation by id
    await prisma.reservation.delete({
      where: { id: parseInt(id, 10) }, // Ensure id is parsed as an integer
    });

    return NextResponse.json({
      success: true,
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    // Catch any errors and return a 500 Internal Server Error
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting the reservation." },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract query parameters for pagination
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp.value);

    // Ensure page and limit are valid integers
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    if (!session?.userId) {
      return NextResponse.json({
        success: false,
        message: "Please log in to view reservation details.",
      });
    }

    // Fetch paginated reservations and the total count using Prisma
    const [reservations, totalReservations] = await Promise.all([
      prisma.reservation.findMany({
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: {
          createdAt: "desc", // Sort reservations by creation date (newest first)
        },
      }),
      prisma.reservation.count(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalReservations / limitNumber);

    console.log('reservations: ', reservations);
    return NextResponse.json({
      success: true,
      data: {
        reservations,
        pagination: {
          totalReservations,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Internal server error",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

 