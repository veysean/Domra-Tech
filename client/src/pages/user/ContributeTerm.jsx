import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import requestImg from "../../assets/request2.png";
import contributeImg from "../../assets/contribute2.png";
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
            <div className="contribute-term-page pb-10 md:px-0">
                
                <HomeHeroSection header={t("contributeHeader")} desc={t("contributeDesc")} />
                
                <div className="max-w-[1156px] m-auto p-4">
                <div className="flex justify-center my-10">
                    <GuidLine />
                </div>
                {!isRequestNewWord && (
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-10 md:gap-5 max-w-[1156px] mx-auto w-full">
                        
                        {/* Add new word request */}
                        <div className="group w-full md:w-[467px] p-7 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-center items-center gap-5 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex flex-col justify-center items-center gap-5 md:gap-12 w-full">
                                <div className="h-10 text-center text-[#3F51B5] text-3xl font-medium group-hover:font-bold w-full">{t('add')}</div>
                                <div className="text-center text-slate-600 text-base font-normal">{t('addDesc')}</div>
                            </div>
                            <div className="w-full md:w-80 h-72 p-2.5 flex justify-center items-center">
                                <img className="w-60 h-56 object-contain" src={contributeImg} alt="Contribute" />
                            </div>
                            <button 
                                className="px-5 py-3.5 main-color2 rounded-[30px] text-white text-xl font-bold hover:bg-[#DD9229] mt-3"
                                onClick={() => auth ? setIsRequestNewWord(true) : navigate("/auth")}
                            >
                                {t('submitTerm')}
                            </button>
                        </div>

                        {/* Request changing */}
                        <div className="group w-full md:w-[467px] p-7 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-center items-center gap-5 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex flex-col justify-center items-center gap-5 md:gap-12 w-full">
                                <div className="h-10 text-center text-[#3F51B5] text-3xl font-medium group-hover:font-bold w-full">{t('improve')}</div>
                                <div className="text-center text-slate-600 text-base font-normal">{t('improveDesc')}</div>
                            </div>
                            <div className="w-full md:w-80 h-72 p-2.5 flex justify-center items-center">
                                <img className="w-60 h-56 object-contain" src={requestImg} alt="Request" />
                            </div>
                            <button 
                                className="px-5 py-3.5 main-color2 rounded-[30px] text-white text-xl font-bold hover:bg-[#DD9229] mt-3"
                                onClick={() => auth ? navigate("/") : navigate("/auth")}
                            >
                                {t('improve')}
                            </button>
                        </div>

                    </div>
                )}

                {isRequestNewWord && (
                    <div className="flex justify-center my-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-[600px]"
                        >
                            <RequestNewWordForm onCancel={() => setIsRequestNewWord(false)} user={userData} />
                        </motion.div>
                    </div>
                )}
                </div>
            </div>
        </motion.div>
    );
}
