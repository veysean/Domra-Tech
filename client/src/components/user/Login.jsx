import React, { useState } from "react";
import { authServices } from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Login = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Login data:", formData);
   //connect to authentication API 
   try {
      const res = await authServices.login(formData);
      const {token} = res.data;
      if(token) {
        login(token);
        //navigate to main
        console.log("Login successful");
      }else{
        setError("Login failed. Please check your credentials.");
      }
   } catch (error) {
      if (error.response?.data?.message) {

        setError(error.response.data.message);
        
      } else {
        setError("Login failed. Please try again.");
      }
   }
   finally{
    setLoading(false);
   }
  }

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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
