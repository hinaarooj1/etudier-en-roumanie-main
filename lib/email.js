// lib/email.js
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr', // ← USE .fr for IONOS France
  port: 465,
  secure: true,
  auth: {
    user: 'contact@schoomi.com',
    pass: 'Schoomi2025',
  },
  tls: {
    rejectUnauthorized: false
  }
});



export async function sendEmail(email, body,subject) {

    const mailOptions = {
        from: '"Schoomi" <contact@schoomi.com>',
        to: email,
        subject: subject,
        html: body,
    };

    return transporter.sendMail(mailOptions);
}   