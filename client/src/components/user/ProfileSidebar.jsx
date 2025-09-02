import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../api";
import { LogOut, History, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProfileSidebar() {
    const { auth, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      const fetchUserData = async () => {
        try {
          const response = await API.get("/profile", {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [auth]);
    return (
        <div className="w-screen lg:w-[400px] h-screen p-7 bg-white border-t-[3px] border-indigo-500 flex flex-col gap-24 shadow-xl">
            <div className="w-full flex flex-col gap-5">
                <div className="text-indigo-500 text-2xl font-medium font-['Inter']">Your profile</div>
                <div className="flex flex-col items-center gap-6">
                    <img className="w-24 h-24 rounded-[65px]" src={userData?.profileURL} />
                    <div className="flex flex-col items-center gap-1">
                        <div className=" text-gray-700 text-xl font-medium font-['Inter']">{`${userData?.firstName} ${userData?.lastName}`}</div>
                        <div className=" text-slate-500 text-base font-medium font-['Inter']">{userData?.email}</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-center gap-10">
                <button className="w-full py-3.5 border-t border-slate-600 inline-flex gap-5 hover:bg-gray-300 hover:rounded-[5px]" onClick={() => { logout(); navigate("/"); }}>
                    <LogOut size={24} color="#2D3748"/>
                    <div className="text-gray-700 text-base font-medium font-['Inter']">Logout</div>
                </button>
                <div className="w-full py-3.5 border-t border-slate-600 inline-flex gap-5 hover:bg-gray-300 hover:rounded-[5px]">
                    <History size={24} color="#2D3748"/>
                    <div className="text-gray-700 text-base font-medium font-['Inter']">Request History</div>
                </div>
                <div className="w-full py-3.5 border-t border-slate-600 flex gap-5 hover:bg-gray-300 hover:rounded-[5px]">
                    <Heart size={24} color="#2D3748"/>
                    <div className="text-gray-700 text-base font-medium font-['Inter']">Favorites</div>
                </div>
            </div>
        </div>
    );
}
