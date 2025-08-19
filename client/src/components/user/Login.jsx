import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
   //connect to authentication API 
   
  };

  return (
    <div className="w-[505px] h-[549px] relative rounded-[30px]">
      <div className="w-[505px] h-[549px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Title */}
        <h2 className="absolute left-[217px] top-[47px] text-3xl font-['Righteous'] gradient-text">
          Login
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-96 left-[69px] top-[113px] absolute flex flex-col gap-5"
        >
          {/* Email */}
          <div className="flex flex-col gap-2.5">
            <label className="text-indigo-500 text-xl font-['Inter']">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-indigo-500 text-xl font-['Inter']">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold hover:bg-indigo-500/80"
          >
            Login
          </button>

          {/* Forgot Password */}
          <div className="text-center underline border-slate-200 text-slate-500 text-xs font-light leading-snug cursor-pointer">
            Forgot password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
