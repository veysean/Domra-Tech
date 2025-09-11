import React, { useEffect, useState } from "react";
import PromoCard from "../../components/user/Promocard";
import Login from "../../components/user/Login";
import SignUp from "../../components/user/SignUp";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(() => location.pathname === "/auth/register");

  const handleToggle = () => {
    const next = !isSignUp;
    setIsSignUp(next);
    navigate(next ? "/auth/register" : "/auth/login", { replace: true });
  };
  

  useEffect(() => {
    const shouldShowSignUp = location.pathname === "/auth/register";
    setIsSignUp(shouldShowSignUp);
  }, [location.pathname]);

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
    <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-l from-indigo-500/50 to-purple-800/50 overflow-hidden">
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