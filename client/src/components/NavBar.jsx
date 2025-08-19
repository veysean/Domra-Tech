import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

    const [open, setOPen] = useState(false);
    const [language, setLanguage] = useState("ENG");
    const [activeMenu, setActiveMenu] = useState("Home");

    const handleSelect = (lang) => {
        setLanguage(lang);
        setOPen(false);
    };

    const navItems = [
        { label: "Home", path: "/", width: "w-[64px]" },
        { label: "Categories", path: "/categories", width: "w-[115px]" },
        { label: "Contribute terms", path: "/contribute-term", width: "w-[167px]" },
        { label: "About us", path: "/about-us", width: "w-[96px]" }
    ];

    return (
        <>
            <div className="w-full h-full px-10 py-5 bg-white border-b border-[#E2E8F0] flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-[36px] h-[28px] text-[#667EEA] text-[24px] font-bold font-inter">KH</div>
                    <div className="w-[147px] h-[28px] text-[#667EEA] text-[24px] font-normal font-['Righteous']">Domra Tech</div>
                </div>

                {/* Menu & Actions */}
                <div className="flex items-center gap-5">
                    {/* Nav Links */}
                    <div className="flex items-center gap-5 mr-50">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`${item.width} h-[28px] text-[#667EEA] text-[20px] font-inter cursor-pointer ${
                                activeMenu === item.label
                                    ? "underline underline-offset-4 decoration-[#667EEA]"
                                    : ""
                                }`}
                                onClick={() => setActiveMenu(item.label)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* LogIn / Sign up button */}
                    <div className="w-[165px] px-2.5 py-2 bg-[#667EEA] rounded-[30px] flex justify-center items-center">
                    <div className="text-white text-[20px] font-medium font-inter">LogIn / sign up</div>
                    </div>

                    {/* Language Selector */}
                    <div className="relative">

                        {/* Button */}
                        <button 
                            onClick={() => setOPen(!open)}
                            className="w-[113px] h-[44px] bg-[#F8F9FA] rounded-[30px] outline outline-[1px] outline-[#E2E8F0] outline-offset-[-1px] flex justify-center items-center"
                        >
                            <div className="flex justify-center items-center">
                                <div className="w-[55px] text-[#667EEA]/80 text-[20px] font-semibold font-inter"> {language} </div>
                                <div className="w-[19px]">
                                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.714666 1.04808C0.78254 0.993216 0.863172 0.949687 0.951943 0.919987C1.04071 0.890287 1.13588 0.875 1.23199 0.875C1.3281 0.875 1.42327 0.890287 1.51204 0.919987C1.60081 0.949687 1.68144 0.993216 1.74931 1.04808L10.0002 7.70177L18.2511 1.04808C18.319 0.993305 18.3997 0.949855 18.4884 0.92021C18.5772 0.890566 18.6723 0.875308 18.7684 0.875308C18.8645 0.875308 18.9596 0.890566 19.0484 0.92021C19.1371 0.949855 19.2178 0.993305 19.2857 1.04808C19.3537 1.10286 19.4075 1.16788 19.4443 1.23945C19.4811 1.31102 19.5 1.38772 19.5 1.46519C19.5 1.54265 19.4811 1.61936 19.4443 1.69093C19.4075 1.76249 19.3537 1.82752 19.2857 1.8823L10.5175 8.95192C10.4496 9.00678 10.369 9.05031 10.2802 9.08001C10.1915 9.10971 10.0963 9.125 10.0002 9.125C9.90408 9.125 9.80892 9.10971 9.72015 9.08001C9.63137 9.05031 9.55074 9.00678 9.48287 8.95192L0.714666 1.8823C0.64662 1.82757 0.592633 1.76256 0.555797 1.69098C0.518961 1.61941 0.5 1.54268 0.5 1.46519C0.5 1.3877 0.518961 1.31097 0.555797 1.23939C0.592633 1.16782 0.64662 1.10281 0.714666 1.04808Z" fill="url(#paint0_linear_528_682)" fill-opacity="0.8"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_528_682" x1="3.5809" y1="4.12183" x2="17.8791" y2="3.7978" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#667EEA"/>
                                    <stop offset="1" stop-color="#764BA2"/>
                                    </linearGradient>
                                    </defs>
                                    </svg>
                                </div>
                            </div>
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute right-0 mt-2 w-[113px] bg-[#F8F9FA] shadow-md rounded-2xl overflow-hidden">
                            {["ENG", "KH"].map((lang) => (
                                <div
                                key={lang}
                                onClick={() => handleSelect(lang)}
                                className="px-5 py-2.5 text-[#667EEA]/80 text-[20px] font-semibold font-inter hover:bg-gray-100 cursor-pointer flex justify-between items-center border-t first:border-t-0 border-[#E2E8F0]"
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

        </>
    );

}