// lib/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendEmail(email, body,subject) {

    const mailOptions = {
        from: `Schoomi`,
        to: email,
        subject: subject,
        html: body,
    };

    return transporter.sendMail(mailOptions);
}   