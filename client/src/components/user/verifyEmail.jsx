//client/src/components/user/verifyEmail.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { authServices } from '../../api';
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState('');
    const [apiCalled, setApiCalled] = useState(false);
    const [verificationComplete, setVerificationComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const { login } = useContext(AuthContext); // Use the login function from AuthContext

    useEffect(() => {
        const verifyToken = async () => {
            if (apiCalled || verificationComplete) return;
            setApiCalled(true);

            if (!token) {
                setError('No verification token found.');
                setMessage('');
                return;
            }

            try {
                const response = await authServices.verifyEmail(token);
                setMessage(response.data.message);
                
                const { token: jwtToken } = response.data;
                if (jwtToken) {
                    // Call the login function from AuthContext
                    login(jwtToken);
                    setVerificationComplete(true);
                    
                }

            } catch (err) {
                setError(err.response?.data?.message || 'Failed to verify email. Please try again.');
                setMessage('');
            }
        };

        verifyToken();
    }, [token, apiCalled, verificationComplete, login, navigate]);

    return (
        <div className="flex flex-col items-center justify-center p-5 space-y-4">
            <h2 className="text-3xl font-bold font-['Righteous'] gradient-text">
                Email Verification
            </h2>
            {verificationComplete && (
                <p className="text-lg flex items-center">
                    Your account has been verified. 
                    <Link to="/" className="underline text-indigo-500 ml-2">
                        Click here to log in.
                    </Link>
                </p>
            )}
        </div>
    );
};

export default VerifyEmail;