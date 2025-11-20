import React, { useState } from "react";
import PromoCard from "../../components/user/Promocard";
import Login from "../../components/user/Login";
import SignUp from "../../components/user/SignUp";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  const promoVariants = {
    initialLeft: { x: -50, opacity: 1 },
    animateLeft: { x: 0, opacity: 1 },
    exitLeft: { x: -50, opacity: 0 },

    initialRight: { x: 50, opacity: 1 },
    animateRight: { x: 0, opacity: 1 },
    exitRight: { x: 50, opacity: 0 },
  };

  const formVariants = {
    hiddenLeft: { x: -50, opacity: 1 },
    visibleLeft: { x: 0, opacity: 1 },
    hiddenRight: { x: 50, opacity: 1 },
    visibleRight: { x: 0, opacity: 1 },
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center main-color opacity-90 overflow-hidden">
      {/* Toggle Button for Small Screens */}
      <div className="md:hidden absolute top-6 right-6 z-20">
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition"
        >
          {isSignUp ? "Go to Login" : "Go to Sign Up"}
        </button>
      </div>
      <div className="flex relative">
        <AnimatePresence mode="wait">
          {isSignUp ? (
            <>
              {/* Promo left → right */}
              <motion.div
                key="promo-signup"
                variants={promoVariants}
                initial="initialRight"
                animate="animateRight"
                exit="exitRight"
                transition={{ duration: 2}}
                className="hidden md:flex items-center justify-center z-10 -mr-15"
              >
                <PromoCard isSignUp={isSignUp} handleToggle={handleToggle} />
              </motion.div>

              {/* SignUp card */}
              <motion.div
                key="signup-form"
                className="flex items-center justify-center z-10 -ml-15"
                variants={formVariants}
                initial="hiddenLeft"
                animate="visibleLeft"
                exit="hiddenLeft"
                transition={{ duration: 1}}
              >
                <SignUp />
              </motion.div>
            </>
          ) : (
            <>
              {/* Login card */}
              <motion.div
                key="login-form"
                className="flex items-center justify-center z-10 -mr-15"
                variants={formVariants}
                initial="hiddenRight"
                animate="visibleRight"
                exit="hiddenRight"
                transition={{ duration: 1}}
              >
                <Login />
              </motion.div>

              {/* Promo right → left */}
              <motion.div
                key="promo-login"
                variants={promoVariants}
                initial="initialLeft"
                animate="animateLeft"
                exit="exitLeft"
                transition={{ duration: 2}}
                className="hidden lg:flex items-center justify-center -ml-15"
              >
                <PromoCard isSignUp={isSignUp} handleToggle={handleToggle} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
