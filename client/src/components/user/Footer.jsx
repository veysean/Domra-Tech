import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/footerLogo.png';
export default function Footer() {
    const { t } = useTranslation();
    return (
        <>

        <div className="w-full h-full flex flex-col items-start">
        {/* Top section */}
        <div className="w-full h-auto lg:h-[312px] bg-[#F8F9FA] overflow-hidden flex flex-col justify-center items-center pl-5 lg:pl-0 pt-5 lg:pt-0">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[350px]">
            
            {/* Left section - Logo, tagline, socials */}
            <div className="w-full lg:w-[451px] flex flex-col items-start">
                {/* Logo */}
                <div className="w-full lg:w-[279px] pb-5 lg:pb-10 flex flex-col items-start gap-3 lg:gap-5">
                    <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Domra Tech Logo"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                    </div>
                </div>

                {/* Tagline */}
                <div className="w-full h-[72px] text-[#4A5568] text-sm lg:text-[16px] font-medium font-inter">
                {t('desc')}
                </div>
            </div>

            {/* Right section - Feature + Contact */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[120px]">
                {/* Feature */}
                <div className="w-full lg:w-[161px] flex flex-col items-start gap-5 lg:gap-7">
                <div className="w-full text-[#2D3748] text-lg lg:text-[20px] font-bold">{t('feature')}</div>
                <div className="w-full flex flex-col items-start gap-3 lg:gap-5">
                    <Link to={"/"} className="text-[#2D3748] text-base lg:text-[20px]  hover:text-[#667EEA]">{t('home')}</Link>
                    <Link to={"/categories"} className="text-[#2D3748] text-base lg:text-[20px]  hover:text-[#667EEA]">{t('categories')}</Link>
                    <Link to={"/contribute-term"} className="text-[#2D3748] text-base lg:text-[20px]  hover:text-[#667EEA]">{t('contributeTerm')}</Link>
                    <Link to={"/about-us"} className="text-[#2D3748] text-base lg:text-[20px]  hover:text-[#667EEA]">{t('aboutUs')}</Link>
                </div>
                </div>

                {/* Contact */}
                <div className="w-[253px] flex flex-col items-start gap-7 sm:pb-2">
                <div className="text-[#2D3748] text-lg lg:text-[20px] font-bold ">{t('contactUs')}</div>
                <div className="w-full flex flex-col items-start gap-5">
                    {/* <div className="flex items-center gap-2.5"> */}
                    {/* <div className="w-4 h-4">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.15387 1.32849C3.90343 1.00649 3.42745 0.976861 3.139 1.26531L2.10508 2.29923C1.6216 2.78271 1.44387 3.46766 1.6551 4.06847C2.50338 6.48124 3.89215 8.74671 5.82272 10.6773C7.75329 12.6078 10.0188 13.9966 12.4315 14.8449C13.0323 15.0561 13.7173 14.8784 14.2008 14.3949L15.2347 13.361C15.5231 13.0726 15.4935 12.5966 15.1715 12.3461L12.8653 10.5524C12.7008 10.4245 12.4866 10.3793 12.2845 10.4298L10.0954 10.9771C9.50082 11.1257 8.87183 10.9515 8.43845 10.5181L5.98187 8.06155C5.54849 7.62817 5.37427 6.99919 5.52292 6.40459L6.07019 4.21553C6.12073 4.01336 6.07552 3.79918 5.94758 3.63468L4.15387 1.32849ZM2.38477 0.511076C3.12689 -0.231039 4.3515 -0.154797 4.99583 0.673634L6.78954 2.97983C7.1187 3.40304 7.23502 3.95409 7.10498 4.47423L6.55772 6.66329C6.49994 6.8944 6.56766 7.13888 6.7361 7.30732L9.19268 9.7639C9.36113 9.93235 9.6056 10.0001 9.83671 9.94229L12.0258 9.39502C12.5459 9.26499 13.097 9.3813 13.5202 9.71047L15.8264 11.5042C16.6548 12.1485 16.731 13.3731 15.9889 14.1152L14.955 15.1492C14.2153 15.8889 13.1089 16.2137 12.0778 15.8512C9.51754 14.9511 7.11438 13.4774 5.06849 11.4315C3.0226 9.38562 1.54895 6.98246 0.648838 4.42225C0.286318 3.39112 0.61113 2.28472 1.35085 1.545L2.38477 0.511076Z" fill="black"/>
                        </svg>
                    </div> */}
                    {/* <div className="w-[126px] text-[#2D3748] text-base lg:text-[20px]">0123456789</div> */}
                    {/* </div> */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-5 h-[15px]">
                            <svg 
                            width="21" 
                            height="16" 
                            viewBox="0 0 21 16" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path 
                                d="M0.5 3C0.5 1.61929 1.61929 0.5 3 0.5H18C19.3807 0.5 20.5 1.61929 20.5 3V13C20.5 14.3807 19.3807 15.5 18 15.5H3C1.61929 15.5 0.5 14.3807 0.5 13V3ZM3 1.75C2.30964 1.75 1.75 2.30964 1.75 3V3.27113L10.5 8.52113L19.25 3.27113V3C19.25 2.30964 18.6904 1.75 18 1.75H3ZM19.25 4.72887L13.3649 8.25993L19.25 11.8815V4.72887ZM19.2078 13.3233L12.1573 8.9845L10.5 9.97887L8.84272 8.9845L1.79221 13.3233C1.93468 13.8569 2.42144 14.25 3 14.25H18C18.5786 14.25 19.0653 13.8569 19.2078 13.3233ZM1.75 11.8815L7.6351 8.25993L1.75 4.72887V11.8815Z" 
                                fill="black"
                            />
                            </svg>
                        </div>
                        <a href="mailto:domra.tech.kh@gmail.com" className="w-[223px] text-[#2D3748] text-base lg:text-[20px] cursor-pointer hover:text-blue-600">
                            domra.tech.kh@gmail.com</a>
                        </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-[25px] h-[25px]" onClick={() => window.open("https://github.com/veysean/Domra-Tech.git", "_blank")}>
                            <svg  className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] cursor-pointer"  viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Github" clipPath="url(#clip0_470_82)">
                                <path id="Vector" d="M15.5 0C7.2125 0 0.5 6.7125 0.5 15C0.5 21.6375 4.79375 27.2438 10.7562 29.2313C11.5062 29.3625 11.7875 28.9125 11.7875 28.5188C11.7875 28.1625 11.7688 26.9813 11.7688 25.725C8 26.4188 7.025 24.8063 6.725 23.9625C6.55625 23.5313 5.825 22.2 5.1875 21.8438C4.6625 21.5625 3.9125 20.8688 5.16875 20.85C6.35 20.8313 7.19375 21.9375 7.475 22.3875C8.825 24.6562 10.9813 24.0188 11.8438 23.625C11.975 22.65 12.3687 21.9938 12.8 21.6188C9.4625 21.2438 5.975 19.95 5.975 14.2125C5.975 12.5813 6.55625 11.2313 7.5125 10.1813C7.3625 9.80625 6.8375 8.26875 7.6625 6.20625C7.6625 6.20625 8.91875 5.8125 11.7875 7.74375C12.9875 7.40625 14.2625 7.2375 15.5375 7.2375C16.8125 7.2375 18.0875 7.40625 19.2875 7.74375C22.1562 5.79375 23.4125 6.20625 23.4125 6.20625C24.2375 8.26875 23.7125 9.80625 23.5625 10.1813C24.5188 11.2313 25.1 12.5625 25.1 14.2125C25.1 19.9688 21.5938 21.2438 18.2563 21.6188C18.8 22.0875 19.2688 22.9875 19.2688 24.3938C19.2688 26.4 19.25 28.0125 19.25 28.5188C19.25 28.9125 19.5312 29.3813 20.2812 29.2313C23.2595 28.2267 25.8475 26.3131 27.6808 23.7601C29.514 21.207 30.5 18.1431 30.5 15C30.5 6.7125 23.7875 0 15.5 0Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_470_82">
                                <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <a href="https://github.com/veysean/Domra-Tech.git" className="w-[223px] text-[#2D3748] text-base lg:text-[20px] cursor-pointer hover:text-blue-600">
                            GitHub Repository
                        </a>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>

        {/* Bottom section */}
        <div className="w-full h-[59px] pr-10 bg-[#F8F9FA] overflow-hidden border-t border-[#E9ECEF] flex justify-end items-center">
            <div className="w-[1200px] h-6 flex justify-end items-center gap-2.5">
            <div className="w-4 h-4">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.5C1 12.366 4.13401 15.5 8 15.5C11.866 15.5 15 12.366 15 8.5C15 4.63401 11.866 1.5 8 1.5C4.13401 1.5 1 4.63401 1 8.5ZM16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5ZM8.14648 5.49219C6.93359 5.49219 6.21875 6.41211 6.21875 7.99414V9.05469C6.21875 10.625 6.92188 11.5156 8.14648 11.5156C9.125 11.5156 9.78711 10.9297 9.875 10.0977H11.1699V10.1914C11.0703 11.6387 9.81641 12.6582 8.14062 12.6582C6.04883 12.6582 4.87109 11.3223 4.87109 9.05469V7.98242C4.87109 5.7207 6.07227 4.34375 8.14062 4.34375C9.82227 4.34375 11.0762 5.39844 11.1699 6.91602V7.00391H9.875C9.78711 6.125 9.10742 5.49219 8.14648 5.49219Z" fill="black"/>
                </svg>
            </div>
            <div className="text-[#2D3748] text-base lg:text-[20px]">{t('rightReserved')}</div>
            </div>
        </div>
        </div>


        </>
    );
}