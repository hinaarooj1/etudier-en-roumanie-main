import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { country, name, phone, email, website, address, details } = body;

    // Validate required fields
    // if (!country) {
    //   return NextResponse.json(
    //     { error: "Country is required." },
    //     { status: 400 }
    //   );
    // }

    // Create a new representation
    const representation = await prisma.representation.create({
      data: {
        country,
        name,
        phone,
        email,
        website,
        address,
        details,
      },
    });

    // Check if the session exists
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp?.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }
    return NextResponse.json(
      { success: true, representation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating representation:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete a representation." },
        { status: 400 }
      );
    }
    // Check if the session exists
    const cookieStore = await cookies();
    const temp = cookieStore.get("session");
    const session = await decrypt(temp.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }
    // Delete the representation
    const deletedRepresentation = await prisma.representation.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { success: true, deletedRepresentation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting representation:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const representations = await prisma.representation.findMany();
    return NextResponse.json({ success: true, data: representations });
  } catch (error) {
    console.error("Error fetching representations:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
