import React from "react"
import {motion} from "framer-motion"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const UserProfile = ({ userData }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="w-[456px] p-7 bg-white rounded-[30px] border-t-[3px] border-indigo-500 flex flex-col items-start gap-24 shadow-xl">
            <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="text-indigo-500 text-2xl font-medium font-['Inter']">Your profile</div>
                <div className="inline-flex justify-start items-center gap-6">
                    <img className="w-24 h-24 rounded-[65px]" src={userData?.profileURL} />
                    <div className="w-48 h-14 inline-flex flex-col justify-start items-start">
                        <div className="self-stretch h-8 justify-start text-gray-700 text-xl font-medium font-['Inter']">{`${userData?.firstName} ${userData?.lastName}`}</div>
                        <div className="self-stretch flex-1 justify-start text-slate-500 text-base font-medium font-['Inter']">{userData?.email}</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-end gap-10">
                <button className="self-stretch py-3.5 border-t border-slate-600 inline-flex gap-5 hover:bg-gray-300 hover:rounded-[30px]" onClick={logout}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 15.625C7.5 15.9702 7.77982 16.25 8.125 16.25L18.125 16.25C18.4702 16.25 18.75 15.9702 18.75 15.625L18.75 4.375C18.75 4.02982 18.4702 3.75 18.125 3.75L8.125 3.75C7.77982 3.75 7.5 4.02982 7.5 4.375L7.5 6.875C7.5 7.22018 7.22018 7.5 6.875 7.5C6.52982 7.5 6.25 7.22018 6.25 6.875L6.25 4.375C6.25 3.33946 7.08947 2.5 8.125 2.5L18.125 2.5C19.1605 2.5 20 3.33946 20 4.375L20 15.625C20 16.6605 19.1605 17.5 18.125 17.5L8.125 17.5C7.08947 17.5 6.25 16.6605 6.25 15.625L6.25 13.125C6.25 12.7798 6.52982 12.5 6.875 12.5C7.22018 12.5 7.5 12.7798 7.5 13.125L7.5 15.625Z" fill="#2D3748"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.183058 10.4419C-0.0610196 10.1979 -0.0610196 9.80214 0.183058 9.55806L3.93306 5.80806C4.17714 5.56398 4.57286 5.56398 4.81694 5.80806C5.06102 6.05214 5.06102 6.44786 4.81694 6.69194L2.13388 9.375L13.125 9.375C13.4702 9.375 13.75 9.65482 13.75 10C13.75 10.3452 13.4702 10.625 13.125 10.625L2.13388 10.625L4.81694 13.3081C5.06102 13.5521 5.06102 13.9479 4.81694 14.1919C4.57286 14.436 4.17714 14.436 3.93306 14.1919L0.183058 10.4419Z" fill="#2D3748"/>
                    </svg>
                    <div className="w-16 h-4 justify-start text-gray-700 text-base font-medium font-['Inter']">Logout</div>
                </button>
                <div className="self-stretch py-3.5 border-t border-slate-600 inline-flex gap-5 hover:bg-gray-300 hover:rounded-[30px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.875 0C0.839466 0 0 0.839466 0 1.875V16.25C0 16.9404 0.559644 17.5 1.25 17.5V1.875C1.25 1.52982 1.52982 1.25 1.875 1.25H17.5C17.5 0.559644 16.9404 0 16.25 0H1.875Z" fill="#2D3748"/>
                        <path d="M4.375 2.5C3.33947 2.5 2.5 3.33947 2.5 4.375V18.125C2.5 19.1605 3.33947 20 4.375 20H11.9822C12.4795 20 12.9564 19.8025 13.3081 19.4508L19.4508 13.3081C19.8025 12.9564 20 12.4795 20 11.9822V4.375C20 3.33947 19.1605 2.5 18.125 2.5H4.375ZM3.75 4.375C3.75 4.02982 4.02982 3.75 4.375 3.75H18.125C18.4702 3.75 18.75 4.02982 18.75 4.375V11.25H13.125C12.0895 11.25 11.25 12.0895 11.25 13.125V18.75H4.375C4.02982 18.75 3.75 18.4702 3.75 18.125V4.375ZM12.5 18.4911V13.125C12.5 12.7798 12.7798 12.5 13.125 12.5H18.4911L12.5 18.4911Z" fill="#2D3748"/>
                    </svg>
                    <div className="w-32 h-4 justify-start text-gray-700 text-base font-medium font-['Inter']">Request History</div>
                </div>
                <div className="self-stretch py-3.5 border-t border-slate-600 inline-flex gap-5 hover:bg-gray-300 hover:rounded-[30px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3.43506L9.10406 2.51417C6.99863 0.350083 3.14268 1.09712 1.75045 3.81605C1.09567 5.09479 0.948438 6.94058 2.14286 9.29697C3.29322 11.5664 5.68459 14.2831 10 17.2432C14.3154 14.2831 16.7068 11.5664 17.8571 9.29697C19.0516 6.94058 18.9043 5.09479 18.2496 3.81605C16.8573 1.09712 13.0014 0.350083 10.8959 2.51417L10 3.43506ZM10 18.75C-9.16641 6.08551 4.09845 -3.80108 9.7804 1.42885C9.85493 1.49746 9.92816 1.56867 10 1.64251C10.0718 1.56867 10.1451 1.49747 10.2196 1.42886C15.9015 -3.8011 29.1664 6.0855 10 18.75Z" fill="#2D3748"/>
                    </svg>
                    <div className="w-24 h-4 justify-start text-gray-700 text-base font-medium font-['Inter']">Favorites</div>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;