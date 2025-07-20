import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from "@/lib/email";

const ReservationStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
};
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            );
        }

        const reservation = await prisma.reservation.findFirst({
            where: {
                manageToken: token,
                tokenExpiry: { gt: new Date() }
            }
        });

        if (!reservation) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 404 }
            );
        }

        return NextResponse.json({ reservation });

    } catch (error) {
        console.error('Error fetching reservation:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reservation' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { token, action, newDate, newTime } = await req.json(); 

        if (!token || !action) {
            return NextResponse.json(
                { error: 'Token and action are required' },
                { status: 400 }
            );
        }

        const reservation = await prisma.reservation.findFirst({
            where: {
                manageToken: token,
                tokenExpiry: { gt: new Date() }
            }
        });

        if (!reservation) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 404 }
            );
        }

        if (action === 'cancel') {
            const updatedReservation = await prisma.reservation.update({
                where: { id: reservation.id },
                data: {
                    status: ReservationStatus.CANCELLED,
                    cancelledBy: reservation.name || 'Unknown',
                }
            });

            // Send cancellation email to user
            const userCancellationSubject = `Appointment Cancellation Confirmation`;
            const userCancellationBody = `
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
    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 600;
      background-color: #fee2e2;
      color: #b91c1c;
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
    <div class="header">Appointment Cancelled</div>

    <p>Dear ${reservation.name},</p>
    <p>Your have successfully canceled your appointment.</p>

    <div class="appointment-details">
      <div class="detail-row">
        <span class="detail-label">Appointment Date:</span>
        <span class="highlight"> ${reservation.date}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Appointment Time:</span>
        <span class="highlight"> ${reservation.time}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status:</span>
        <span class="status-badge">Cancelled</span>
      </div>
    </div>

    <p>If this was a mistake or you'd like to schedule a new appointment, please contact us.</p>

    <div class="footer"> 
      <p>We hope to serve you again in the future.</p>
    </div>
  </div>
</body>
</html>
`;

            await sendEmail(reservation.email, userCancellationBody, userCancellationSubject);

            // Send cancellation notification to admin
            const adminCancellationSubject = `Appointment Cancelled: ${reservation.name}`;
         const adminCancellationBody = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
    }
    .header {
      color: #111827;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f3f4f6;
      text-align: center;
    }
    .card {
      background-color: #f9fafb;
      border-radius: 10px;
      padding: 24px;
      margin: 20px 0;
      border: 1px solid #e5e7eb;
    }
    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
      font-size: 15px;
    }
    .label {
      font-weight: 600;
      color: #4b5563;
      min-width: 140px;
    }
    .value {
      color: #1f2937;
      text-align: right;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      background-color: #fee2e2;
      color: #b91c1c;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #f3f4f6;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Appointment Cancelled</div>

    <div class="card">
      <div class="detail-item">
        <span class="label">Client:</span>
        <span class="value">${reservation.name}</span>
      </div>
      <div class="detail-item">
        <span class="label">Email:</span>
        <span class="value">${reservation.email}</span>
      </div>
      ${reservation.phone ? `
      <div class="detail-item">
        <span class="label">Phone:</span>
        <span class="value">${reservation.phone}</span>
      </div>` : ''}
      <div class="detail-item">
        <span class="label">Appointment Date:</span>
        <span class="value">${reservation.date}</span>
      </div>
      <div class="detail-item">
        <span class="label">Appointment Time:</span>
        <span class="value">${reservation.time}</span>
      </div>
      <div class="detail-item">
        <span class="label">Status:</span>
        <span class="value"><span class="status-badge">Cancelled</span></span>
      </div>
    </div>

    <div class="footer">
      <p>This cancellation was processed through the appointment management system.</p>
    </div>
  </div>
</body>
</html>
`;


            await sendEmail(process.env.EMAIL_USER, adminCancellationBody, adminCancellationSubject);

            return NextResponse.json({ message: 'Appointment cancelled successfully' });
        }
        else if (action === 'reschedule' && newDate && newTime) {
            const newManageToken = crypto.randomBytes(32).toString('hex');
            const updatedReservation = await prisma.reservation.update({
                where: { id: reservation.id },
                data: {
                    status: ReservationStatus.CONFIRMED,
                    date: newDate,
                    time: newTime,
                    manageToken: newManageToken,
                    tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }
            });

            // Send rescheduling confirmation to user
            const userRescheduleSubject = `Appointment Rescheduled - ${newDate} at ${newTime}`;
            const userRescheduleBody = `
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
    .old-value {
      text-decoration: line-through;
      color: #9ca3af;
      margin-right: 8px;
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
    <div class="header">Appointment Rescheduled</div>

    <p>Dear ${reservation.name},</p>
    <p>Your appointment has been successfully updated. Here are your new details:</p>

    <div class="appointment-details">
      <div class="detail-row">
        <span class="detail-label">Previous Date:</span>
        <span class="old-value">${reservation.date}</span>
        <span class="highlight">→ ${newDate}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Previous Time:</span>
        <span class="old-value">${reservation.time}</span>
        <span class="highlight">→ ${newTime}</span>
      </div>
    </div>

    <div class="divider"></div>

    <p>Need to make changes to your appointment?</p>

    <div class="button-container">
      <a href="${process.env.NEXTAUTH_URL}/manage-appointment/${newManageToken}" class="action-button">
        Manage Appointment
      </a>
    </div>

    <div class="footer"> 
      <p>If you didn't request this change, please contact us immediately.</p>
    </div>
  </div>
</body>
</html>
`;

            await sendEmail(reservation.email, userRescheduleBody, userRescheduleSubject);

            // Send rescheduling notification to admin
            const adminRescheduleSubject = `Appointment Rescheduled: ${reservation.name}`;
        const adminRescheduleBody = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e5e7eb;
        }
        .header {
            color: #111827;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
            text-align: center;
        }
        .card {
            background-color: #f9fafb;
            border-radius: 10px;
            padding: 24px;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 15px;
        }
        .label {
            font-weight: 600;
            color: #4b5563;
            min-width: 140px;
        }
        .value {
            color: #1f2937;
            text-align: right;
        }
        .old-value {
            text-decoration: line-through;
            color: #9ca3af;
            margin-right: 8px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
            font-weight: 500;
            background-color: #dcfce7;
            color: #166534;
        }
        .button-primary {
            display: inline-block;
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 8px;
            margin: 24px 0;
            text-align: center;
            transition: background-color 0.2s ease;
        }
        .button-primary:hover {
            background-color: #1d4ed8;
        }
        .footer {
            font-size: 14px;
            color: #6b7280;
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #f3f4f6;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Appointment Rescheduled</div>
        
        <div class="card">
            <div class="detail-item">
                <span class="label">Client:</span>
                <span class="value">${reservation.name}</span>
            </div>
            <div class="detail-item">
                <span class="label">Email:</span>
                <span class="value">${reservation.email}</span>
            </div>
            ${reservation.phone ? `
            <div class="detail-item">
                <span class="label">Phone:</span>
                <span class="value">${reservation.phone}</span>
            </div>` : ''}
            <div class="detail-item">
                <span class="label">Previous Date:</span>
                <span class="value">
                    <span class="old-value">${reservation.date}</span> → ${newDate}
                </span>
            </div>
            <div class="detail-item">
                <span class="label">Previous Time:</span>
                <span class="value">
                    <span class="old-value">${reservation.time}</span> → ${newTime}
                </span>
            </div>
            <div class="detail-item">
                <span class="label">Status:</span>
                <span class="value"><span class="status-badge">Confirmed</span></span>
            </div>
        </div>

        <p style="text-align:center; margin: 20px 0 12px;">Manage this appointment:</p>
        <div style="text-align:center;">
            <a href="${process.env.NEXTAUTH_URL}/admin/dashboard/appointments" class="button-primary">View in Admin Panel</a>
        </div>

        <div class="footer">
            <p>This rescheduling was processed through the appointment management system.</p>
        </div>
    </div>
</body>
</html>
`;

            await sendEmail(process.env.EMAIL_USER, adminRescheduleBody, adminRescheduleSubject);

            return NextResponse.json({
                message: 'Appointment rescheduled successfully',
                reservation: updatedReservation
            });
        }
        else {
            return NextResponse.json(
                { error: 'Invalid action or missing parameters' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error managing reservation:', error);
        return NextResponse.json(
            { error: 'Failed to manage reservation' },
            { status: 500 }
        );
    }
}