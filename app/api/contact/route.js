import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: "Name, email, and subject are required." },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
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
        message: "Please log in to view contact details.",
      });
    }

    // Fetch paginated contacts and the total count using Prisma
    const [contacts, totalContacts] = await Promise.all([
      prisma.contact.findMany({
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: {
          createdAt: "desc", // Sort contacts by creation date (newest first)
        },
      }),
      prisma.contact.count(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalContacts / limitNumber);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          totalContacts,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);

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

// Delete contact by ID
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
        { error: "Please log in to delete a contact." },
        { status: 401 }
      );
    }

    // Check if the id parameter is provided
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete the contact." },
        { status: 400 }
      );
    }

    // Attempt to delete the contact by id
    await prisma.contact.delete({
      where: { id: parseInt(id, 10) }, // Ensure id is parsed as an integer
    });

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    // Catch any errors and return a 500 Internal Server Error
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting the contact." },
      { status: 500 }
    );
  }
}
