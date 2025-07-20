import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { sendEmail } from "@/lib/email";
import crypto from 'crypto';
import { getAuthToken, verifyToken } from "@/lib/auth";



const prisma = new PrismaClient();

// Status enum for reservations
const ReservationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export async function POST(req) {
  try {
    const body = await req.json();
    let { date, email, time, name, phone } = body;
    email = email.toLowerCase().trim();

    // Validate required fields
    if (!date || !time || !email || !name) {
      return NextResponse.json(
        { error: "Date, time, email and name are required." },
        { status: 400 }
      );
    }
    // Check if the session exists
    let userId = null;
    let decoded = null;

    const token = getAuthToken(req);

    if (token) {
      decoded = verifyToken(token); // may throw if invalid
      userId = decoded?.id || null;
    }



    // If the user is not logged in, return a 401 Unauthorized response


    // Check if the session exists

    // Generate unique management token
    const manageToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry

    // Create a new reservation
    const reservation = await prisma.reservation.create({
      data: {
        date,
        email,
        time,
        name,
        userId: userId || null,
        phone: phone || null,
        status: ReservationStatus.CONFIRMED,
        manageToken,
        tokenExpiry
      },
    });

    // Send confirmation email to user
    const userEmailSubject = `Your Appointment Confirmation - ${date} at ${time}`;
    const userEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #222;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px 16px;
      background-color: #f3f4f6;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 36px 32px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      color: #111827;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 28px;
      letter-spacing: -0.02em;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 28px 0;
      border-radius: 1px;
    }
    .appointment-details {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 24px 28px;
      margin: 24px 0;
      border: 1px solid #d1d5db;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);
    }
    .detail-row {
      display: flex;
      margin-bottom: 14px;
      font-size: 15px;
      color: #374151;
    }
    .detail-label {
      font-weight: 600;
      color: #6b7280;
      min-width: 90px;
    }
    .highlight {
      color: #111827;
      font-weight: 700;
      flex: 1;
    }
    p {
      margin: 14px 0;
      font-size: 16px;
      color: #4b5563;
    }
    .button-container {
      margin: 32px 0;
      text-align: center;
    }
    .action-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    .action-button:hover {
      background-color: #1e40af;
      box-shadow: 0 6px 20px rgba(30, 64, 175, 0.6);
    }
    .footer {
      font-size: 13px;
      color: #6b7280;
      margin-top: 36px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Appointment Confirmed</div>

    <p>Dear ${name},</p>
    <p>Thank you for scheduling with us. Here are your appointment details:</p>

    <div class="appointment-details">
      <div class="detail-row">
        <span class="detail-label">Date:</span>
        <span class="highlight">${date}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Time:</span>
        <span class="highlight">${time}</span>
      </div>
    </div>

    <div class="divider"></div>

    <p>Need to make changes to your appointment?</p>

    <div class="button-container">
      <a href="${process.env.NEXTAUTH_URL}/manage-appointment/${manageToken}" class="action-button">
        Manage Appointment
      </a>
    </div>

    <div class="footer"> 
      <p>If you didn't request this appointment, please contact us immediately.</p>
    </div>
  </div>
</body>
</html>
`;


    await sendEmail(email, userEmailBody, userEmailSubject);


    // Send notification to admin
    const adminEmailSubject = `New Appointment: ${name} - ${date} at ${time}`;
    const adminEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #f9fafb;
      padding: 20px;
      margin: 0;
      color: #1f2937;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      padding: 32px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 24px;
    }
    .card {
      background-color: #f9fafb;
      border-radius: 10px;
      padding: 24px;
      border: 1px solid #e5e7eb;
      margin-bottom: 24px;
    }
    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      gap: 5px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 15px;
    }
    .detail-item:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #4b5563;
    }
    .value {
      color: #1f2937;
    }
    .status-badge {
      display: inline-block;
      background-color: #e0f2fe;
      color: #0369a1;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 9999px;
    }
    .button-primary {
      display: inline-block;
      background-color: #2563eb;
      color: white !important;
      text-decoration: none;
      font-weight: 500;
      padding: 12px 24px;
      border-radius: 8px;
      text-align: center;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .button-primary:hover {
      background-color: #1d4ed8;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      border-top: 1px solid #f3f4f6;
      padding-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Appointment Scheduled</div>

    <div class="card">
      <div class="detail-item" style="gap: 7px;">
        <span class="label">Client:</span>
        <span class="value">${name}</span>
      </div>
      <div class="detail-item" style="gap: 7px;">
        <span class="label">Email:</span>
        <span class="value">${email}</span>
      </div>
      ${phone ? `
        <div class="detail-item" style="gap: 7px;">
          <span class="label">Phone:</span>
          <span class="value">${phone}</span>
        </div>` : ''
      }
      <div class="detail-item" style="gap: 7px;">
        <span class="label">Date:</span>
        <span class="value">${date}</span>
      </div>
      <div class="detail-item" style="gap: 7px;">
        <span class="label">Time:</span>
        <span class="value">${time}</span>
      </div>
      <div class="detail-item" style="gap: 7px;">
        <span class="label">Status:</span>
        <span class="value status-badge">Confirmed</span>
      </div>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${process.env.NEXTAUTH_URL}/admin/dashboard/appointments" class="button-primary">View in Admin Panel</a>
    </div>

    <div class="footer">
      <p>This appointment was processed through the booking system.</p>
      <p>You’re receiving this notification because you're listed as an administrator.</p>
    </div>
  </div>
</body>
</html>
`;

    // Make sure to use ADMIN_BASE_URL in your environment variables
    let adminEmail = process.env.EMAIL_USER;
    await sendEmail(adminEmail, adminEmailBody, adminEmailSubject);

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




export async function GET(req) {
  try {
    // Verify session
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Get user email from the database using the ID
    const user = await prisma.customer.findUnique({
      where: { id: decoded.id },
      select: { email: true }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Fetch all appointments for this user
    const appointments = await prisma.reservation.findMany({
      where: {
        OR: [
          { userId: decoded.id },
          { email: user.email }
        ],

      },
      orderBy: [
        { date: "asc" },
        { time: "asc" } // Order by date then time
      ],
      select: {
        id: true,
        date: true,
        time: true,
        status: true,
        name: true,
        email: true,
        phone: true,
        manageToken: true,
        createdAt: true,
        updatedAt: true,
        reason: true
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
        success: false,
        message: "Failed to fetch appointments",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

