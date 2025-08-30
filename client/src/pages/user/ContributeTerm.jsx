import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import requestImg from "../../assets/request.png";
import contributeImg from "../../assets/contribute.png";
import API from "../../api";
import RequestNewWordForm from "../../components/user/RequestNewWordForm";
import GuidLine from "../../components/user/GuidLine";
export default function ContributeTerm() {
    const { t } = useTranslation('contributeTerm');
    const [isRequestNewWord, setIsRequestNewWord] = useState(false);
    const { auth } = useContext(AuthContext);
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1} }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4, delay: 0.1} }}
        >
            <div className="contribute-term-page pb-10">
                <HomeHeroSection header={t("contributeHeader")} desc={t("contributeDesc")} />
                <div className="flex justify-center m-10">
                    <GuidLine />
                </div>
                {isRequestNewWord || isRequestChanging ? null : (
                <div className="w-[1156px] m-auto flex justify-between">
                {/* add new word request */}
                <div className="group w-[467px] p-7 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-center gap-5 hover:shadow-lg transition-shadow duration-300">
                    <div className="self-stretch flex flex-col justify-start items-center gap-12">
                        <div className="self-stretch h-10 text-center justify-start text-indigo-500 text-3xl font-medium font-['Inter'] group-hover:font-bold">Add New Terms</div>
                        <div className="self-stretch text-center justify-start text-slate-600 text-base font-normal font-['Inter']">Submit new technical terms with accurate Khmer translations</div>
                    </div>
                    <div className="w-80 h-72 p-2.5 flex flex-col justify-center items-center gap-2.5">
                        <img className="w-60 h-56" src={contributeImg} />
                    </div>
                        <button className="px-5 py-3.5 bg-indigo-500 rounded-[30px] text-white text-xl font-bold font-['Inter'] hover:bg-indigo-600"
                        onClick={() => auth ? setIsRequestNewWord(true) : navigate("/auth")}
                        >Submit Term</button>
                </div>
                {/* request changing */}
                <div className="group w-[467px] p-7 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-center gap-5 hover:shadow-lg transition-shadow duration-300">
                    <div className="self-stretch flex flex-col justify-start items-center gap-12">
                        <div className="self-stretch h-10 text-center justify-start text-indigo-500 text-3xl font-medium font-['Inter'] group-hover:font-bold"
                        >Improve Translations</div>
                        <div className="self-stretch text-center justify-start text-slate-600 text-base font-normal font-['Inter']">Suggest better translations for existing terms</div>
                    </div>
                    <div className="w-80 h-72 p-2.5 flex flex-col justify-center items-center gap-2.5">
                        <img className="w-60 h-56" src={requestImg} />
                    </div>
                        <button className="px-5 py-3.5 bg-indigo-500 rounded-[30px] text-white text-xl font-bold font-['Inter'] hover:bg-indigo-600"
                        onClick={() => auth ? navigate("/") : navigate("/auth")}
                        >Improve Translation</button>
                    </div>
                 
                </div>
                   )}
                {isRequestNewWord && (
                    <div className="flex justify-center m-10">
                        <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                    ><RequestNewWordForm onCancel={() => setIsRequestNewWord(false)} user={userData} />
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>

    );

}