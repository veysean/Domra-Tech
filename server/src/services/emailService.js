// server/src/services/emailService.js
import fs from 'fs';
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

export const sendVerificationEmail = async (email, firstName, lastName, verificationToken) => {
    const verificationURL = `http://localhost:5173/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Email Verification',
        html: `<p>Dear ${firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'User'},</p>
            <p>Thank you for creating an account with us. To complete your registration and activate your account, please confirm your email address by clicking the link below:</p>
            <p><a href="${verificationURL}" style="display:inline-block;padding:10px 20px;background-color:#3F51B5;color:#fff;text-decoration:none;border-radius:5px;">Verify My Email</a></p>
            <p>If you did not create this account, you can safely ignore this email.</p>
            <p>We are excited to have you on board!</p>
            <p>Best regards,<br/>The Support Team</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully to:', email);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        console.error(error);
        throw new Error('Failed to send email.');
    }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (email, firstName, lastName, resetURL) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Dear ${firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'User'},</p>
       <p>We received a request to reset the password associated with your account. If you made this request, please click the button below to set a new password:</p>
       <p><a href="${resetURL}" style="display:inline-block;padding:10px 20px;background-color:#3F51B5;color:#fff;text-decoration:none;border-radius:5px;">Reset Your Password</a></p>
       <p>For security reasons, this link will expire shortly. If you did not request a password reset, you can safely ignore this email and your account will remain unchanged.</p>
       <p>Thank you,<br/>The Support Team</p>`
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