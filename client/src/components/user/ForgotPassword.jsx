import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send password reset link.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-96 left-[69px] top-[113px] absolute flex flex-col gap-5"
        >
            <div className="flex flex-col gap-2.5">
                <label className="text-indigo-500 text-xl font-['Inter']">Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
                />
            </div>
            <button
                type="submit"
                className="p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold hover:bg-indigo-500/80"
            >
                Send Reset Link
            </button>
            <p className="text-center text-slate-500 text-xs font-light leading-snug">
                <Link to="/auth/login" className="underline">Back to login</Link>
            </p>
            {message && <p className="success-message text-green-500 mt-5">{message}</p>}
            {error && <p className="error-message text-red-500 mt-5">{error}</p>}
        </form>
    );
};

export default ForgotPasswordForm;
