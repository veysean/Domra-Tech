import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/loginPic2.png";
import { useTranslation } from "react-i18next";
import logo from '../../assets/footerLogo.png';

const PromoCard = ({ isSignUp, handleToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="w-[700px] h-[690px] relative bg-white/70 rounded-[30px] shadow-lg overflow-hidden">
      {/* Tagline */}
      <div className="w-[519px] h-16 left-[90px] top-[588px] absolute text-center text-main-color text-xl">
       {t("login_des")}
      </div>

      {/* Floating Image */}
      <div className="w-96 h-96 left-[167px] top-[100px] absolute flex items-center justify-center">
        <motion.img
          src={img}
          alt="Promo"
          className="w-96 h-72 mt-15"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logo */}
      <div className="left-[250px] top-[31px] absolute flex items-center">
          <div className="flex items-center">
            <img
                src={logo}
                alt="Domra Tech Logo"
                className="h-10 md:h-15 w-auto object-contain"
            />
          </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="w-52 h-11 p-2.5 left-[276px] top-[523px] absolute rounded-xl border border-[#3F51B5] flex justify-center items-center gap-2.5 text-main-color hover:main-colro2 hover:text-white"
      >
        <span className=" text-2xl">
          {isSignUp ? t("login") : t("signup")}
        </span>
      </button>
    </div>
  );
};

export default PromoCard;
