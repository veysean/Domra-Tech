
<<<<<<< HEAD
import { BsGlobe } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
=======
import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802

const Header = ({ i18n }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
<<<<<<< HEAD
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
=======
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="flex justify-end items-center px-8 py-4 gap-6">
        {/* Language Switcher */}
<<<<<<< HEAD
        <div className="relative" ref={langRef}>
=======
        <div className="relative">
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setLangOpen((v) => !v)}
          >
            <BsGlobe size={22}/>
<<<<<<< HEAD
            <span className="hidden md:inline font-medium text-gray-700">{i18n.language === 'en' ? t("English") : t("Khmer")}</span>
          </button>
          {langOpen && (
            <div className="absolute left-0 mt-2 w-32 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
=======
            <span className="hidden md:inline font-medium text-gray-700">{i18n.language === 'en' ? 'English' : 'Khmer'}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('en'); setLangOpen(false); }}
              >
<<<<<<< HEAD
                {t("English")}
=======
                English
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('kh'); setLangOpen(false); }}
              >
<<<<<<< HEAD
                {t("Khmer")}
=======
                Khmer
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
<<<<<<< HEAD
        <div className="relative group">
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
=======
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
              <div className="px-4 py-2 text-gray-700 font-medium">Admin User</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</div>
            </div>
          )}
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
        </div>
      </div>
    </header>
  );
};

export default Header;
