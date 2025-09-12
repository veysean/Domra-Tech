import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import i18n from "../../i18n";
import { t } from "i18next";
export default function NavBar() {

    const { auth, logout } = useContext(AuthContext);
    const [isLangOpen, setLangOpen] = useState(false);
    const [language, setLanguage] = useState(i18n.language === "kh" ? "ខ្មែរ" : "ENG");
    const [activeMenu, setActiveMenu] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const languageMap = {
        ENG: "en",
        ខ្មែរ: "kh",
        };

   const handleSelect = (lang) => {
            setLanguage(lang);       // update button text
            i18n.changeLanguage(languageMap[lang]);
            setLangOpen(false);
        };

    const navItems = [
        { label: t("home"), path: "/" },
        { label: t("categories"), path: "/categories" },
        { label: t("contributeTerm"), path: "/contribute-term" },
        { label: t("aboutUs"), path: "/about-us" }
    ];


    return (
        <>
            <div className="w-full bg-white border-b border-[#E2E8F0] px-6 py-4">
                <div className="relative flex justify-between items-center lg:px-10 mx-auto w-full">
                    {/* Logo */}
                    <div className="flex items-center lg:gap-2.5">
                        <div className="w-[36px] h-[28px] text-[#667EEA] lg:text-[24px] font-bold font-inter">KH</div>
                        <div className="w-[147px] h-[28px] text-[#667EEA] lg:text-[24px] font-normal font-['Righteous']">Domra Tech</div>
                    </div>
                    <div className="flex items-center gap-1 ml-0 sm:ml-auto lg:ml-0">

                    {/* Menu & Actions */}
                    <div className="lg:flex justify-between items-center w-full max-w-[1200px]">
                        {/* Nav Links */}
                        <div className="hidden ml-auto mr-50 lg:flex gap-10">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `h-[28px] text-[#667EEA] text-[20px] font-inter cursor-pointer ${
                                        isActive ? "underline underline-offset-4 decoration-[#667EEA]" : ""
                                        }`
                                    }
                                    >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 md:gap-2.5">
                        {/* LogIn / Sign up button */}
                        {auth ? (
                            <Link to="/profile" className="px-2.5 py-2 bg-[#667EEA] rounded-[30px] flex justify-center items-center">
                                <div className="text-white text-xs lg:text-[20px] font-medium font-inter">{t("profile")}</div>
                            </Link>
                            ) : (
                            <Link to="/auth" className="w-auto px-2 lg:px-2.5 py-2 bg-[#667EEA] rounded-[30px] flex justify-center items-center">
                                <div className="text-white text-xs md:text-sm lg:text-[20px] font-medium font-inter">{t("login")} / {t("signup")}</div>
                            </Link>
                            )}
                    
                        {/* Language Selector */}
                        <div className="relative">

                            {/* Button */}
                            <button
                                onClick={() => setLangOpen(!isLangOpen)}
                                className="w-[90px] h-[32px] md:h-[36px] lg:w-[113px] lg:h-[44px] bg-[#F8F9FA] rounded-[30px] outline-[1px] outline-[#E2E8F0] outline-offset-[-1px] flex justify-center items-center"
                            >
                                <div className="flex justify-center items-center">
                                    <div className="flex justify-center items-center ">
                                        <svg className="w-[17px] h-[17px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.375 1.34569C8.53821 1.6016 7.70577 2.37153 7.01593 3.66498C6.79996 4.06993 6.60375 4.51703 6.43124 4.99999H9.375V1.34569ZM5.11193 4.99999C5.33495 4.30174 5.60407 3.65598 5.91299 3.07675C6.13639 2.65788 6.38578 2.26551 6.65908 1.91044C5.10149 2.55442 3.77036 3.63516 2.81836 4.99999H5.11193ZM4.38556 9.37499C4.42274 8.27896 4.55712 7.22712 4.77501 6.24999H2.09203C1.63666 7.20858 1.35044 8.26311 1.27197 9.37499H4.38556ZM6.05858 6.24999C5.82507 7.20621 5.67689 8.25972 5.63632 9.37499H9.375V6.24999H6.05858ZM10.625 6.24999V9.37499H14.3637C14.3231 8.25972 14.1749 7.20621 13.9414 6.24999H10.625ZM5.63632 10.625C5.67689 11.7403 5.82507 12.7938 6.05858 13.75H9.375V10.625H5.63632ZM10.625 10.625V13.75H13.9414C14.1749 12.7938 14.3231 11.7403 14.3637 10.625H10.625ZM6.43124 15C6.60375 15.4829 6.79996 15.9301 7.01593 16.335C7.70577 17.6285 8.53821 18.3984 9.375 18.6543V15H6.43124ZM6.65908 18.0895C6.38578 17.7345 6.13639 17.3421 5.91299 16.9232C5.60407 16.344 5.33495 15.6982 5.11193 15H2.81836C3.77036 16.3648 5.10149 17.4456 6.65908 18.0895ZM4.77501 13.75C4.55712 12.7729 4.42274 11.721 4.38556 10.625H1.27197C1.35044 11.7369 1.63666 12.7914 2.09203 13.75H4.77501ZM13.3409 18.0895C14.8985 17.4456 16.2296 16.3648 17.1816 15H14.8881C14.665 15.6982 14.3959 16.344 14.087 16.9232C13.8636 17.3421 13.6142 17.7345 13.3409 18.0895ZM10.625 15V18.6543C11.4618 18.3984 12.2942 17.6285 12.9841 16.335C13.2 15.9301 13.3962 15.4829 13.5687 15H10.625ZM15.225 13.75H17.908C18.3633 12.7914 18.6495 11.7369 18.728 10.625H15.6144C15.5773 11.721 15.4429 12.7729 15.225 13.75ZM18.728 9.37499C18.6495 8.26311 18.3633 7.20858 17.908 6.24999H15.225C15.4429 7.22712 15.5773 8.27896 15.6144 9.37499H18.728ZM14.087 3.07675C14.3959 3.65598 14.665 4.30174 14.8881 4.99999H17.1816C16.2296 3.63516 14.8985 2.55442 13.3409 1.91044C13.6142 2.26551 13.8636 2.65788 14.087 3.07675ZM13.5687 4.99999C13.3962 4.51703 13.2 4.06993 12.9841 3.66498C12.2942 2.37153 11.4618 1.6016 10.625 1.34569V4.99999H13.5687Z" fill="#667EEA"/>
                                        </svg>
                                        <div className="w-[40px] lg:w-[55px] text-[#667EEA]/80 text-base lg:text-[20px] font-semibold font-inter"> {language} </div>
                                    </div>
                                    <div className="w-[19px]">
                                        <svg className="w-[15px] h-[14px] lg:w-[20px] lg:h-[19px]" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.714666 1.04808C0.78254 0.993216 0.863172 0.949687 0.951943 0.919987C1.04071 0.890287 1.13588 0.875 1.23199 0.875C1.3281 0.875 1.42327 0.890287 1.51204 0.919987C1.60081 0.949687 1.68144 0.993216 1.74931 1.04808L10.0002 7.70177L18.2511 1.04808C18.319 0.993305 18.3997 0.949855 18.4884 0.92021C18.5772 0.890566 18.6723 0.875308 18.7684 0.875308C18.8645 0.875308 18.9596 0.890566 19.0484 0.92021C19.1371 0.949855 19.2178 0.993305 19.2857 1.04808C19.3537 1.10286 19.4075 1.16788 19.4443 1.23945C19.4811 1.31102 19.5 1.38772 19.5 1.46519C19.5 1.54265 19.4811 1.61936 19.4443 1.69093C19.4075 1.76249 19.3537 1.82752 19.2857 1.8823L10.5175 8.95192C10.4496 9.00678 10.369 9.05031 10.2802 9.08001C10.1915 9.10971 10.0963 9.125 10.0002 9.125C9.90408 9.125 9.80892 9.10971 9.72015 9.08001C9.63137 9.05031 9.55074 9.00678 9.48287 8.95192L0.714666 1.8823C0.64662 1.82757 0.592633 1.76256 0.555797 1.69098C0.518961 1.61941 0.5 1.54268 0.5 1.46519C0.5 1.3877 0.518961 1.31097 0.555797 1.23939C0.592633 1.16782 0.64662 1.10281 0.714666 1.04808Z" fill="url(#paint0_linear_528_682)" fillOpacity="0.8"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_528_682" x1="3.5809" y1="4.12183" x2="17.8791" y2="3.7978" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#667EEA"/>
                                        <stop offset="1" stopColor="#764BA2"/>
                                        </linearGradient>
                                        </defs>
                                        </svg>
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown */}
                            {isLangOpen && (
                                <div className="absolute left-0 mt-2 w-[113px] bg-[#F8F9FA] shadow-md rounded-2xl overflow-hidden z-50">
                                {["ENG", "ខ្មែរ"].map((lang) => (
                                    <div
                                    key={lang}
                                    onClick={() => handleSelect(lang)}
                                    className="px-5 py-2.5 text-[#667EEA]/80 text-base lg:text-[20px] font-semibold font-inter hover:bg-gray-100 cursor-pointer flex justify-between items-center border-t first:border-t-0 border-[#E2E8F0]"
                                    >
                                    {lang}
                                    {language === lang && (
                                        <span className="text-[#667EEA] font-bold">
                                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.8537 0.645917C11.9002 0.692363 11.9372 0.747538 11.9624 0.808284C11.9876 0.869029 12.0005 0.93415 12.0005 0.999917C12.0005 1.06568 11.9876 1.13081 11.9624 1.19155C11.9372 1.2523 11.9002 1.30747 11.8537 1.35392L4.85365 8.35392C4.80721 8.40048 4.75203 8.43742 4.69129 8.46263C4.63054 8.48784 4.56542 8.50081 4.49965 8.50081C4.43389 8.50081 4.36877 8.48784 4.30802 8.46263C4.24728 8.43742 4.1921 8.40048 4.14565 8.35392L0.645655 4.85392C0.551768 4.76003 0.499023 4.63269 0.499023 4.49992C0.499023 4.36714 0.551768 4.2398 0.645655 4.14592C0.739542 4.05203 0.866879 3.99929 0.999655 3.99929C1.13243 3.99929 1.25977 4.05203 1.35366 4.14592L4.49965 7.29292L11.1457 0.645917C11.1921 0.599354 11.2473 0.562411 11.308 0.537205C11.3688 0.511998 11.4339 0.499023 11.4997 0.499023C11.5654 0.499023 11.6305 0.511998 11.6913 0.537205C11.752 0.562411 11.8072 0.599354 11.8537 0.645917Z" fill="#718096"/>
                                            </svg>
                                        </span>
                                    )}
                                    </div>
                                ))}
                                </div>
                                
                            )}
                            </div>
                        </div>
                    </div>
                    {/* Mobile Menu Icon */}
                    <div className="lg:hidden ml-3">
                        <button onClick={toggleMenu} className="text-[#667EEA]">
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Dropdown */}
                    {isMenuOpen && (
                    <div className="absolute top-full right-0 left-67 mt-2 w-[180px] bg-[#F8F9FA] shadow-md rounded-2xl overflow-hidden z-50 transition-all duration-300 ease-in-out">
                        {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                            `px-5 py-2.5 text-[#667EEA]/80 text-sm md:text-base lg:text-[18px] font-inter hover:bg-gray-100 cursor-pointer flex justify-between items-center border-t first:border-t-0 border-[#E2E8F0] ${
                                isActive ? "underline underline-offset-4 decoration-[#667EEA] font-semibold" : ""
                            }`
                            }
                        >
                            {item.label}
                        </NavLink>
                        ))}
                    </div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );

}