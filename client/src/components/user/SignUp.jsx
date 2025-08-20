import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaUser } from "react-icons/fa";   // Guest/User icon
import { HiArrowLeft } from "react-icons/hi"; // arrow icon
import { authServices } from "../../api";
import { Link } from "react-router-dom";

const SignUpCard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
   // console.log("Sign Up data:", { firstName, lastName, email, password });
    // connect to sign-up API here
    try{
      await authServices.register(formData);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }

  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="w-[505px] h-[549px] relative bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <h2 className="absolute left-[217px] top-[47px] text-3xl font-['Righteous'] gradient-text">
        Sign up
      </h2>
    {/* step one for sign up */}
    {step === 1 && (
      <form
        onSubmit={handleNext}
        className="w-96 h-80 left-[69px] top-[113px] absolute flex flex-col gap-2.5"
      >
        {/* Email */}
        <div className="flex flex-col gap-2.5">
          <label className="text-indigo-500 text-xl font-['Inter']">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2.5">
          <label className="text-indigo-500 text-xl font-['Inter']">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3.5 mt-2">
          <div className="w-28 h-px bg-slate-500" />
            <span className="w-28 text-center text-slate-500 text-sm font-['Inter']">
              or continue with
            </span>
          <div className="w-28 h-px bg-slate-500" /></div>

        {/* Continue with Google */}
        <div className="w-96 px-5 py-2.5 bg-slate-200 rounded-xl flex items-center gap-20 cursor-pointer">
           <FcGoogle className="w-5 h-5" />
            <span className="text-gray-600 text-sm font-['Inter']">
              Continue with Google
            </span>
        </div>

        {/* Continue as Guest */}
        <Link to={"/"}>
        <div className="w-96 px-5 py-2.5 bg-slate-200 rounded-xl flex items-center gap-20 cursor-pointer">
         <FaUser className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 text-sm font-['Inter']">
            Continue as guest
          </span>
        </div>
        </Link>

        {/* Sign up Button */}
        <button
          type="submit"
          className="self-stretch p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold mt-3 hover:bg-indigo-500/80"
        >
          Next
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
            className="text-indigo-500 cursor-pointer text-xl flex items-center gap-1"
            >
            <HiArrowLeft />
          </div>
            {/* First Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-indigo-500 text-xl font-['Inter']">First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-indigo-500 text-xl font-['Inter']">Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold hover:bg-indigo-500/80"
            >
              Sign Up
            </button>
          </form>
        )}
    </div>
  );
};

export default SignUpCard;
