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
      <div className="max-w-md w-full p-4 bg-white rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold text-[#3F51B5] mb-4">Email Verification</h2>

          <p className="text-gray-600">
            Please wait while we verify your email…
          </p>

        {(message || error) && (
          <div
            className={`flex items-center justify-center gap-2 px-2 py-3 rounded-lg mb-4 mt-3 border
              ${message ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}
            `}
          >
            <span>{message || error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;