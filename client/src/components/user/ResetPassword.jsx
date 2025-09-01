import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('/api/auth/reset-password', { token, password });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.');
        }
    };

    return (
        <div className="w-[505px] h-[549px] relative rounded-[30px]">
            <div className="w-[505px] h-[549px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <h2 className="absolute left-[130px] top-[47px] text-3xl font-['Righteous'] gradient-text">
                    Reset Password
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="w-96 left-[69px] top-[113px] absolute flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-indigo-500 text-xl font-['Inter']">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-indigo-500 text-xl font-['Inter']">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold hover:bg-indigo-500/80"
                    >
                        Reset Password
                    </button>
                    {message && <p className="success-message text-green-500 mt-5">{message}</p>}
                    {error && <p className="error-message text-red-500 mt-5">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
