import React, { useState } from "react";
import { authServices } from "../../api";
import { useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
const Login = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });

  const { login } = useContext(AuthContext);

  //handle form submit
  const handleSubmit = async (e) => {
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
        navigate(location.state?.from || "/");
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
    <div className="m-auto lg:w-[505px] h-[549px] lg:relative rounded-[30px]">
      <div className="w-full flex flex-col gap-4 p-10 align-middle lg:w-[505px] h-[549px] left-0 top-0 lg:absolute bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Title */}
        <h2 className="lg:absolute text-center left-[217px] top-[47px] text-3xl font-['Righteous'] gradient-text">
          Login
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-96 left-[69px] top-[113px] lg:absolute flex flex-col gap-5"
        >
          {/* Email */}
          <div className="flex flex-col gap-2.5">
            <label className="text-indigo-500 text-xl">
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
            <label className="text-indigo-500 text-xl">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="p-2.5 bg-white rounded-xl outline-1 outline-indigo-500 text-slate-500 text-sm font-light leading-snug"
            />
          {/* Toggle button */}
          {formData.password && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-36 text-gray-500 hover:text-indigo-500"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          )}
        
        </div>
          {/* Error Message */}
          {error && (
        <div
          className={`p-3 rounded-lg text-sm  bg-red-100 text-red-700 ${error ? "block" : "hidden"}`}
        >
          {error}
        </div>
      )}
          {/* Login Button */}
          <button
            type="submit"
            className="p-2.5 bg-indigo-500 rounded-xl text-white text-sm font-extrabold hover:bg-indigo-500/80"
          >
            Login
          </button>

          {/* Forgot Password */}
          <div
            onClick={() => navigate("/forgot-password")}
            className="text-center underline text-slate-500 text-xs font-light leading-snug cursor-pointer"
          >
            Forgot password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
