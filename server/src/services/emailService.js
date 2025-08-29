// server/src/services/emailService.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationURL = `http://localhost:5173/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Email Verification',
        html: `<p>Hello,</p><p>Thank you for registering. Please click on the link below to verify your email address:</p><a href="${verificationURL}">Verify Email Address</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully to:', email);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send email.');
    }
};

export default {
    sendVerificationEmail
};