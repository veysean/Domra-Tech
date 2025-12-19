import React, { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";   // Guest/User icon
import { HiArrowLeft } from "react-icons/hi"; // arrow icon
import { Eye, EyeOff } from "lucide-react";
import { authServices } from "../../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const SignUpCard = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleNext = (e) => {
    e.preventDefault();
    if(!formData.email && !formData.password) {
      setError("Email and Password are required");
      return;
    }
    else if(!formData.email) {
      setError("Email is required");
      return;
    }
    else if(!formData.password) {
      setError("Password is required");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!formData.firstName && !formData.lastName) {
      setError("First Name and Last Name are required");
      return;
    }
    else if(!formData.firstName) {
      setError("First Name is required");
      return;
    }
    else if(!formData.lastName) {
      setError("Last Name is required");
      return;
    }
    try{
      const res = await authServices.register(formData);
      login(res.data.token); // decode and store token
      navigate("/");
      setError(null);
    } catch (error) {
      if(error.response?.status === 409){
        setError(error.response.data.message);
      }
    }

  };

  const handleBack = () => {
    setError(null);
    setStep(1);
  };

  return (
    <div className="m-auto w-[380px] lg:w-[505px] h-[549px] p-10 relative bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      
      <h2 className="text-center text-3xl font-['Righteous'] text-main-color">
        {t("signup")}
      </h2>
    {/* step one for sign up */}
    {step === 1 && (
      <form
        onSubmit={handleNext}
        className="flex flex-col gap-5"
      >
        {/* Email */}
        <div className="flex flex-col gap-2.5">
          <label className="text-main-color text-xl ">{t("email")}: </label>
          <input
            type="email"
            placeholder={t("email_placehoder")}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2.5 bg-white rounded-xl outline-1 outline-[#3F51B5] text-slate-500 text-sm font-light"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2.5 relative">
          <label className="text-main-color text-xl ">
            {t("password")}:
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password_placehoder")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-2.5 pr-10 bg-white rounded-xl outline-1 outline-[#3F51B5] text-slate-500 text-sm font-light"
          />

          {/* Toggle button */}
          {formData.password && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-12 text-gray-500 hover:text-indigo-500"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          )}
        </div>

        {/* Divider */}
        <div className="flex px-5 items-center gap-3 mt-2">
          <div className="flex-1 h-px bg-slate-500" />
            <span className="w-28 text-center text-slate-500 text-sm">
              {t("continue_with")}
            </span>
          <div className="flex-1 h-px bg-slate-500" /></div>

        {/* Continue with Google */}
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          buttonText={t('continue_with_google')}
          onSuccess={async (credentialResponse) => {
            try {
              const res = await authServices.googleRegister({
                token: credentialResponse.credential,
              });
              login(res.data.token);
              navigate("/");
            } catch (err) {
              setError(err.response?.data?.message || "Google sign-up failed");
            }
          }}
          onError={() => setError("Google sign-up failed")}
        />

        {/* Continue as Guest */}
        <Link to={"/"}>
        <div className="w-106 px-3 py-2.5 bg-slate-200 rounded-xl flex cursor-pointer">
         <FaUser className="w-5 h-5 text-gray-600" />
          <span className="w-full text-gray-600 text-sm text-center">
            {t('continue_as_guest')}
          </span>
        </div>
        </Link>
        {/* Error Message */}
        {error && (
          <div className="self-stretch p-2 bg-red-100 text-red-700 text-sm rounded-lg mt-2">
            {error}
          </div>
        )}
        {/* Sign up Button */}
        <button
          type="submit"
          className="self-stretch p-2.5 main-color2 rounded-xl text-white text-sm font-extrabold mt-3 hover:bg-[#DD9229]"
        >
          {t('next')}
        </button>
      </form>
      )}
       {/* Step 2: First Name & Last Name */}
        {step === 2 && (
          
          <form
            onSubmit={handleSignUp}
            className="w-96 left-[69px] top-[113px] absolute flex flex-col gap-5"
          >
          <div
            onClick={handleBack}
            className="text-main-color cursor-pointer text-xl flex items-center gap-1"
            >
            <HiArrowLeft />
          </div>
            {/* First Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-main-color text-xl ">First Name:</label>
              <input
                type="text"
                placeholder={t('firstname')}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                autoComplete="current-password"
                className="p-2.5 bg-white rounded-xl outline-1 outline-[#3F51B5] text-slate-500 text-sm font-light leading-snug"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-main-color text-xl ">Last Name:</label>
              <input
                type="text"
                placeholder={t('lastname')}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="p-2.5 bg-white rounded-xl outline-1 outline-[#3F51B5] text-slate-500 text-sm font-light leading-snug"
              />
            </div>
            {/* Error Message */}
            {error && (
              <div className="self-stretch p-2 bg-red-100 text-red-700 text-sm rounded-lg mt-2">
                {error}
              </div>
            )}
            {/* Sign Up Button */}
            <button
              type="submit"
              className="p-2.5 main-color2 rounded-xl text-white text-sm font-extrabold hover:bg-[#DD9229]"
            >
              {t('signup')}
            </button>
          </form>
        )}
    </div>
  );
};

export default SignUpCard;
