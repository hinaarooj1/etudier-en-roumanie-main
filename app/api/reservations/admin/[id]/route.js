import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";

// 

import { sendEmail } from "@/lib/email";
// Status enum for reservations
const ReservationStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
};




export async function PUT(req, { params }) {
    try {
     const { id } = await params; 
        const { status, reason } = await req.json();
 
        // Validate status
        if (![ReservationStatus.CANCELLED, ReservationStatus.COMPLETED].includes(status)) {
            return NextResponse.json(
                { error: "Invalid status. Only CANCELLED or COMPLETED allowed." },
                { status: 400 }
            );
        }

        // Verify admin session
        const cookieStore = await cookies();
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



        // Update appointment
        const updatedAppointment = await prisma.reservation.update({
            where: { id },
            data: {
                status,
                ...(status === ReservationStatus.CANCELLED && {
                    cancelledAt: new Date(),
                    cancelledBy: "admin",
                    reason: reason || null
                }),
                ...(status === ReservationStatus.COMPLETED && {
                    completedAt: new Date()
                })
            },
           
        });

        // Send notification emails
        await sendStatusUpdateEmails(updatedAppointment, status, reason);

        return NextResponse.json({
            success: true,
            message: `Appointment ${status.toLowerCase()} successfully`,
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error("Error updating appointment:", error);
        return NextResponse.json(
            {
                error: "Failed to update appointment",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

async function sendStatusUpdateEmails(appointment, status, reason) {
    // Email to client
    const clientSubject = `Your Appointment Has Been ${status}`;
    const clientEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; padding: 24px 16px; background-color: #f3f4f6; }
    .container { background-color: #ffffff; border-radius: 12px; padding: 36px 32px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { color: #111827; font-size: 28px; font-weight: 700; margin-bottom: 28px; letter-spacing: -0.02em; }
    .appointment-details { background-color: #f9fafb; border-radius: 8px; padding: 24px 28px; margin: 24px 0; border: 1px solid #d1d5db; }
    .detail-row { display: flex; margin-bottom: 14px; font-size: 15px; color: #374151; }
    .detail-label { font-weight: 600; color: #6b7280; min-width: 90px; }
    .highlight { color: #111827; font-weight: 700; flex: 1; }
    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-weight: 600; 
      background-color: ${status === 'CANCELLED' ? '#fee2e2' : '#dcfce7'}; 
      color: ${status === 'CANCELLED' ? '#b91c1c' : '#166534'}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Appointment ${status}</div>
    <p>Dear ${appointment.name},</p>
    <p>Your appointment has been ${status.toLowerCase()} by our administration team.</p>

    <div class="appointment-details">
      <div class="detail-row">
        <span class="detail-label">Status:</span>
        <span class="status-badge">${status}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Date:</span>
        <span class="highlight">${appointment.date}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Time:</span>
        <span class="highlight">${appointment.time}</span>
      </div>
      ${reason ? `
      <div class="detail-row">
        <span class="detail-label">Reason:</span>
        <span class="highlight">${reason}</span>
      </div>` : ''}
    </div>

    <p>If you have any questions, please contact our support team.</p>
  </div>
</body>
</html>
`;

    await sendEmail(appointment.email, clientEmailBody, clientSubject);

    // Email to admin (notification)
    const adminSubject = `Appointment ${status}: ${appointment.name} - ${appointment.date}`;
    const adminEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f9fafb; padding: 20px; margin: 0; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb; }
    .header { text-align: center; font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 24px; }
    .card { background-color: #f9fafb; border-radius: 10px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 24px; }
    .detail-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .label { font-weight: 600; color: #4b5563; }
    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 9999px; font-weight: 600;
      background-color: ${status === 'CANCELLED' ? '#fee2e2' : '#dcfce7'}; 
      color: ${status === 'CANCELLED' ? '#b91c1c' : '#166534'}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">You have ${status} the appointment</div>
    <div class="card">
      <div class="detail-item">
        <span class="label">Client:</span>
        <span>${appointment.name}</span>
      </div>
      <div class="detail-item">
        <span class="label">Status:</span>
        <span class="status-badge">${status}</span>
      </div>
      <div class="detail-item">
        <span class="label">Date:</span>
        <span>${appointment.date}</span>
      </div>
      <div class="detail-item">
        <span class="label">Time:</span>
        <span>${appointment.time}</span>
      </div>
      
    </div>
  </div>
</body>
</html>
`;

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    await sendEmail(adminEmail, adminEmailBody, adminSubject);
}