// server/src/services/emailService.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationURL = `http://localhost:5173/auth/verify-email?token=${verificationToken}`;

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

// Function to send a password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Hello,</p><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p>Please click on the following link, or paste this into your browser to complete the process:</p><a href="${resetURL}">Reset Password</a><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully to:', email);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw new Error('Failed to send email.');
    }
};
export default {
    sendVerificationEmail,
    sendPasswordResetEmail
};