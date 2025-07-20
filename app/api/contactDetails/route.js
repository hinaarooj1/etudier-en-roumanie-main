import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      companyName,
      address,
      postalCode,
      fiscalCode,
      registrationNumber,
      phone,
      mobilePhone,
      email,
      website,
      businessHours,
    } = body;

    // Validate required fields
    // if (!companyName || !email || !phone) {
    //   return NextResponse.json(
    //     { error: "Company name, email, and phone are required." },
    //     { status: 400 }
    //   );
    // }
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp.value);

    if (!session) {
      return NextResponse.json(
        { error: "Please log in to create contact details." },
        { status: 401 }
      );
    }
    const details = await prisma.contactDetails.create({
      data: {
        companyName,
        address,
        postalCode,
        fiscalCode,
        registrationNumber,
        phone,
        mobilePhone,
        email,
        website,
        businessHours,
      },
    });

    return NextResponse.json({ success: true, details }, { status: 201 });
  } catch (error) {
    console.error("Error updating contact details:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const contactDetails = await prisma.contactDetails.findMany({
      orderBy: {
        createdAt: "desc", // Sort contacts by creation date (newest first)
      },
    });
    if (!contactDetails) {
      return NextResponse.json({
        success: false,
        message: "No contact details found.",
      });
    }
    return NextResponse.json({ success: true, data: contactDetails });
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
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
 
    // Check if the session exists
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Please log in to delete a contactDetails." },
        { status: 401 }
      );
    }

    // Check if the id parameter is provided
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete the  contactDetails." },
        { status: 400 }
      );
    }

    // Attempt to delete the contact by id
    await prisma.contactDetails.delete({
      where: { id: parseInt(id, 10) }, // Ensure id is parsed as an integer
    });

    return NextResponse.json({
      success: true,
      message: "Deletion failed",
    });
  } catch (error) {
    // Catch any errors and return a 500 Internal Server Error
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting the contactDetails." },
      { status: 500 }
    );
  }
}
