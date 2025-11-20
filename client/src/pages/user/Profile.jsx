import react from "react";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../api";
import { userServices } from "../../api";
import ProfileSidebar from "../../components/user/ProfileSidebar";
import ProfileForm from "./ProfileForm";
import History from "./History";
import Favorite from "./Favorite";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const { auth, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  

    useEffect(() => {
    if (auth) {
      const fetchUserData = async () => {
        try {
          const response = await userServices.getProfile();
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [auth]);
  
  return (
    <div className="flex w-screen h-screen">
      {/* --- Desktop Layout --- */}
      <div className="hidden lg:flex w-full">
        {/* Sidebar */}
        <ProfileSidebar
          setActiveTab={setActiveTab}
          userData={userData}
          logout={logout}
        />

        {/* Main Content */}
        <div className="flex-1 flex-col p-10 bg-gray-50 overflow-y-auto">
          {activeTab === "profile" && (
            <ProfileForm userData={userData} setUserData={setUserData} />
          )}
          {activeTab === "history" && <History userData={userData} />}
          {activeTab === "favorites" && <Favorite userData={userData} />}
        </div>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="flex w-full lg:hidden">
        {!activeTab && (
          <ProfileSidebar
            setActiveTab={setActiveTab}
            userData={userData}
            logout={logout}
          />
        )}

        {activeTab && (
          <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
            <button
              className="mb-4 text-blue-600"
              onClick={() => setActiveTab(null)}
            >
            <MdArrowBack className="mr-2" size={24} />
            </button>

            {activeTab === "profile" && (
              <ProfileForm userData={userData} setUserData={setUserData} />
            )}
            {activeTab === "history" && <History userData={userData} />}
            {activeTab === "favorites" && <Favorite userData={userData} />}
          </div>
        )}
      </div>
    </div>
)
}
