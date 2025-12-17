import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authServices } from "../../api";
import { Eye, EyeOff, CheckCircle, AlertCircle, Lock, Loader } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { t } = useTranslation();

  // Form states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  //change language to kh
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams]);

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
      setTokenValid(false);
    }
  }, [token]);

  // Password strength checker
  const checkPasswordStrength = (pwd) => {
    const requirements = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[@$!%*?&]/.test(pwd)
    };

    let score = 0;
    if (requirements.length) score++;
    if (requirements.uppercase) score++;
    if (requirements.lowercase) score++;
    if (requirements.number) score++;
    if (requirements.special) score++;

    let label, color;
    if (score === 0) {
      label = t('very_weak');
      color = "bg-red-500";
    } else if (score === 1) {
      label = t('weak');
      color = "bg-orange-500";
    } else if (score === 2) {
      label = t('fair');
      color = "bg-yellow-500";
    } else if (score === 3) {
      label = t('good');
      color = "bg-lime-500";
    } else if (score === 4) {
      label = t('strong');
      color = "bg-green-500";
    } else {
      label = t('very_strong');
      color = "bg-emerald-600";
    }

    setPasswordStrength({
      score,
      label,
      color,
      requirements
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
    setError("");
    setMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
    setMessage("");
  };

  const validateForm = () => {
    // Check if passwords are filled
    if (!password || !confirmPassword) {
      setError(t('both_pass_required'));
      return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError(t('pass_not_match'));
      return false;
    }

    // Check password strength
    if (passwordStrength.score < 3) {
      setError(t('pass_strength'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await authServices.resetPassword({
        token,
        password,
        confirmPassword
      });
      
      setMessage(res.data?.message || t('pass_reset_sucessfully'));
      setResetSuccess(true);

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || t('fail_reset_pass');
      setError(errorMsg);
      setResetSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Requirement checker component
  const RequirementItem = ({ met, text }) => (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-500' : 'bg-slate-300'}`}>
        {met && <CheckCircle className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-sm ${met ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
        {text}
      </span>
    </div>
  );

  // Loading skeleton
  if (loading && !resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3F51B5] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] p-8">
            <div className="flex flex-col items-center gap-4">
              <Loader className="w-8 h-8 text-[#3F51B5] animate-spin" />
              <p className="text-slate-600 font-medium">{t('reset_pass_loading')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3F51B5] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('reset_pass_invalid_link')}</h2>
                  <p className="text-slate-600 mb-4">{error || "This password reset link is invalid or has expired."}</p>
                </div>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="w-full py-3 bg-[#E4A54D] hover:bg-[#d79a42] text-white font-semibold rounded-xl transition-all duration-200"
                >
                  {t('reset_pass_btn_reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3F51B5] p-4 animate-fadeIn">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col items-center gap-6 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                {/* Success Message */}
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('reset_pass_sucess_message_title')}</h2>
                  <p className="text-slate-600 mb-4">
                    {t('reset_pass_sucess_message_desc')}
                  </p>
                </div>

                {/* Success Banner */}
                <div className="w-full p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-green-700 font-medium text-sm">
                    {message || "Please save your new password in a secure place."}
                  </p>
                </div>

                {/* Redirect Notice */}
                <div className="text-center py-4">
                  <p className="text-sm text-slate-600 mb-3">{t('redirecting_to_login')}</p>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 bg-[#3F51B5] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-[#3F51B5] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#3F51B5] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>

                {/* Manual Navigation */}
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full py-3 bg-[#E4A54D] hover:bg-[#d79a42] text-white font-semibold rounded-xl transition-all duration-200"
                >
                  {t('go_to_login_now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main form state
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3F51B5] p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          
          {/* Header */}
          <div className="p-8 border-b border-slate-200">
            <h1 className="text-3xl font-['Noto Sans Khmer'] gradient-text text-center">
              {t('reset_pass')}
            </h1>
            <p className="text-center text-slate-600 text-sm mt-2">
              {t('create_a_strong_password')}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* New Password Field */}
              <div className="flex flex-col gap-3">
                <label className="text-[#3F51B5] text-base font-semibold">
                  {t('new_pass')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('new_password_placeholder')}
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border-2 border-slate-200 focus:border-[#3F51B5] focus:outline-none text-slate-600 placeholder-slate-400 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!password}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Strength Meter */}
              {password && (
                <div className="flex flex-col gap-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-600">
                      {t('password_strength')}
                    </label>
                    <span className={`text-xs font-bold ${
                      passwordStrength.color === 'bg-red-500' ? 'text-red-600' :
                      passwordStrength.color === 'bg-orange-500' ? 'text-orange-600' :
                      passwordStrength.color === 'bg-yellow-500' ? 'text-yellow-600' :
                      passwordStrength.color === 'bg-lime-500' ? 'text-lime-600' :
                      passwordStrength.color === 'bg-green-500' ? 'text-green-600' :
                      'text-emerald-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>

                  {/* Strength Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-slate-600">{t('requirement')}</p>
                    <RequirementItem met={passwordStrength.requirements.length} text={t('requirement_item_1')} />
                    <RequirementItem met={passwordStrength.requirements.uppercase} text={t('requirement_item_2')} />
                    <RequirementItem met={passwordStrength.requirements.lowercase} text={t('requirement_item_3')} />
                    <RequirementItem met={passwordStrength.requirements.number} text={t('requirement_item_4')} />
                    <RequirementItem met={passwordStrength.requirements.special} text={t('requirement_item_5')} />
                  </div>
                </div>
              )}

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-3">
                <label className="text-[#3F51B5] text-base font-semibold">
                  {t('confirm_password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('confirm_new_password_placeholder')}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border-2 border-slate-200 focus:border-[#3F51B5]focus:outline-none text-slate-600 placeholder-slate-400 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!confirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && password && (
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${password === confirmPassword ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm ${password === confirmPassword ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                      {password === confirmPassword ? t('pass_match') : t('password_not_match')}
                    </span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 border-red-500 rounded-lg animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 font-medium text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !password || !confirmPassword || passwordStrength.score < 3 || password !== confirmPassword}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>{t('resetting')}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>{t('reset_pass')}</span>
                  </>
                )}
              </button>

              {/* Back Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/auth")}
                  className="text-[#3F51B5] hover:text-indigo-600 font-medium text-sm underline transition-colors"
                >
                  ← {t('back_to_login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;