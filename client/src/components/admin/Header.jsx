
import { BsGlobe } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const Header = ({ i18n }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { t } = useTranslation('adSidebar');
  const navigate = useNavigate();

  const admin = { name: "នីតា"};
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="flex justify-end items-center px-8 py-4 gap-6">
        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setLangOpen((v) => !v)}
          >
            <BsGlobe size={22}/>
            <span className="hidden md:inline font-medium text-gray-700">{i18n.language === 'en' ? t("English") : t("Khmer")}</span>
          </button>
          {langOpen && (
            <div className="absolute left-0 mt-2 w-32 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('en'); setLangOpen(false); }}
              >
                {t("English")}
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('kh'); setLangOpen(false); }}
              >
                {t("Khmer")}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <NavLink 
        to={"profile"}
        className="relative group group">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => navigate("profile")}
          >
            <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {admin.name.charAt(0)}
              </span>
            </div>
          </button>
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white border border-gray-200 shadow-lg z-30 
                          opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 
                          transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div className="px-4 py-2 text-gray-700 font-medium">{admin.name}</div>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
