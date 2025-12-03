import { LogOut, History, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ProfileSidebar({ setActiveTab, userData, logout }) {
  const navigate = useNavigate();
  const { t } = useTranslation('profilePage');


  return (
    <div className="w-screen lg:w-[320px] h-screen p-7 bg-white flex flex-col gap-16 shadow-xl">
      {/* Profile Header */}
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
            src={userData?.profileURL || "/default-avatar.png"}
            alt="Profile"
          />
          <div className="flex flex-col items-center">
            <div className="text-gray-700 text-xl font-medium">{`${userData?.firstName || ""} ${userData?.lastName || ""}`}</div>
            <div className="text-slate-500 text-sm">{userData?.email}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        <button
          className="w-full py-3 flex gap-4 items-center hover:bg-gray-200 rounded px-3"
          onClick={() => setActiveTab("profile")}
        >
          <User size={22} color="#2D3748" />
          <span className="text-gray-700 text-base font-medium">{t('editPf')}</span>
        </button>

        <button
          className="w-full py-3 flex gap-4 items-center hover:bg-gray-200 rounded px-3"
          onClick={() => setActiveTab("history")}
        >
          <History size={22} color="#2D3748" />
          <span className="text-gray-700 text-base font-medium">{t('reqHt')}</span>
        </button>

        <button
          className="w-full py-3 flex gap-4 items-center hover:bg-gray-200 rounded px-3"
          onClick={() => setActiveTab("favorites")}
        >
          <Heart size={22} color="#2D3748" />
          <span className="text-gray-700 text-base font-medium">{t('fav')}</span>
        </button>

        <button
          className="w-full py-3 flex gap-4 items-center hover:bg-red-100 rounded px-3 mt-6"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={22} color="#DC2626" />
          <span className="text-red-600 text-base font-medium">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}
