import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authServices } from "../../api";
import { AuthContext } from "../../contexts/AuthContext";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Verification token is missing.");
      return;
    }

    const verify = async () => {
      try {
        const res = await authServices.verifyEmail(token);
        setMessage(res.data.message);
        login(res.data.token); // store JWT
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [searchParams, login, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyEmail;