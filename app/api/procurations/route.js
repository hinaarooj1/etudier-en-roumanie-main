// app/api/procurations/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const prisma = new PrismaClient();

// Define Prisma types (add these to your Prisma schema)
/*
model Procuration {
  id          Int       @id @default(autoincrement())
  delegator   Json
  delegate    Json
  date        DateTime
  city        String
  expenses    Json
  services    Json
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
}
*/

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Procuration data:', body);

    // Validate required fields
    if (!body.delegator?.firstName || !body.delegator?.lastName || !body.city || !body.date) {
      return NextResponse.json(
        { error: "Missing required fields (delegator name, city, or date)." },
        { status: 400 }
      );
    }

    // Check session
    const cookieStore = await cookies();
    console.log('cookieStore: ', cookieStore);
    const temp = cookieStore.get("session");
    console.log('temp: ', temp);
    const session = await decrypt(temp?.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }

    // Create new procuration
    const procuration = await prisma.procuration.create({
      data: {
        delegator: body.delegator,
        delegate: body.delegate,
        date: new Date(body.date),
        city: body.city,
        expenses: body.expenses,
        services: body.services,
        userId: session.userId
      },
    });

    return NextResponse.json(
      { success: true, procuration },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating procuration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Procuration ID is required." },
        { status: 400 }
      );
    }

    // Check session
    const cookieStore = await cookies();
    console.log('cookieStore: ', cookieStore);
    const temp = cookieStore.get("session");
    console.log('temp: ', temp);
    const session = await decrypt(temp?.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }

    // Verify procuration belongs to user
    const procuration = await prisma.procuration.findUnique({
      where: { id: parseInt(id) },
    });

    if (!procuration || procuration.userId !== session.userId) {
      return NextResponse.json({ error: "Procuration not found" }, { status: 404 });
    }

    // Delete the procuration
    const deletedProcuration = await prisma.procuration.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { success: true, deletedProcuration },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting procuration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Check session
    const cookieStore = await cookies();
    console.log('cookieStore: ', cookieStore);
    const temp = cookieStore.get("session");
    console.log('temp: ', temp);
    const session = await decrypt(temp?.value);

    // If the user is not logged in, return a 401 Unauthorized response
    if (!session?.userId) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }

    // Get user's procurations
    const procurations = await prisma.procuration.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      { success: true, data: procurations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching procurations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}