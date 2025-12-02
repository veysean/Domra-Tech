import React, { useState } from "react";
import { authServices } from "../../api";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await authServices.forgotPassword(email);
      setMessage(res.data?.message || "Password reset link has been sent to your email. Please check your inbox.");
      setEmailSent(true);
      
      // Auto-redirect after 4 seconds
      setTimeout(() => {
        navigate("/auth");
      }, 15000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send reset link. Please try again.";
      setError(errorMsg);
      setEmailSent(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setMessage("");
    setError("");
    setEmailSent(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3F51B5] p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          
          {/* Header */}
          <div className="p-8 border-b border-slate-200">
            <h1 className="text-3xl font-['Noto Sans Khmer'] text-[#3F51B5] text-center">
              Forgot Password
            </h1>
            <p className="text-center text-slate-600 text-sm mt-2">
              No worried!! We will help you reset your password.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Email Input Field */}
                <div className="flex flex-col gap-3">
                  <label className="text-[#3F51B5] text-base font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 border-slate-200 focus:border-[#3F51B5] focus:outline-none text-slate-600 placeholder-slate-400 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-3 p-4 ">
                    <AlertCircle className="w-5 h-5 text-red-600 " />
                    <div>
                      <p className="text-red-700 font-medium text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#E4A54D] hover:bg-[#d79a42] disabled:bg-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>

                {/* Back to Login Link */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="text-[#3F51B5] hover:text-indigo-600 font-medium text-sm underline transition-colors"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            ) : (
              // Success State
              <div className="flex flex-col items-center gap-6 py-8 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-slate-800">Check Your Email!</h2>
                  <p className="text-slate-600">
                    We've sent a password reset link to <span className="font-semibold text-[#3F51B5]">{email}</span>
                  </p>
                </div>

                {/* Success Message */}
                <div className="w-full p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-green-700 font-medium text-sm">
                    {message || "Please check your email and click the reset link. It will expire in 1 hour."}
                  </p>
                </div>

                {/* Next Steps */}
                <div className="w-full text-left bg-slate-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Next steps:</p>
                  <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the password reset link</li>
                    <li>Enter and confirm your new password</li>
                    <li>You'll be able to log in with your new password</li>
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-2.5 text-[#3F51B5] border-2 border-indigo-300 hover:bg-indigo-50 font-semibold rounded-lg transition-all duration-200"
                  >
                    Try Another Email
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="flex-1 py-2.5 bg-[#3F51B5] hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Back to Login
                  </button>
                </div>

                {/* Auto-redirect notice */}
                <p className="text-xs text-slate-500 pt-2">
                  Redirecting to login...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;