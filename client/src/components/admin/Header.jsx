
import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";

const Header = ({ i18n }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="flex justify-end items-center px-8 py-4 gap-6">
        {/* Language Switcher */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setLangOpen((v) => !v)}
          >
            <BsGlobe size={22}/>
            <span className="hidden md:inline font-medium text-gray-700">{i18n.language === 'en' ? 'English' : 'Khmer'}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('en'); setLangOpen(false); }}
              >
                English
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { i18n.changeLanguage('kh'); setLangOpen(false); }}
              >
                Khmer
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
