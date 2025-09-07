import React, { useState } from "react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

const LogoutConfirmation = () => {
  const { t } = useTranslation("adSidebar");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    //Clear user session or token here
    localStorage.removeItem("token"); 
    sessionStorage.removeItem("token");

    setIsOpen(false);
    navigate("/admin/login");
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
      >
        <BsBoxArrowLeft size={22} />
        <span>{t("logout")}</span>
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0 z-90">
          <div className="bg-white rounded-lg shadow-xl w-80 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {t("logoutConfirmTitle", "Confirm Logout")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("logoutConfirmMsg", "Are you sure you want to log out?")}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                {t("cancel", "Cancel")}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                {t("confirm", "Logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutConfirmation;
