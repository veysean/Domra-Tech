import React from 'react';
import ForgotPasswordForm from "../../components/user/ForgotPassword";

const ForgotPasswordPage = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-l from-indigo-500/50 to-purple-800/50 overflow-hidden">
            <div className="w-[505px] h-[549px] relative rounded-[30px]">
                <div className="w-[505px] h-[549px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                    <h2 className="absolute left-[130px] top-[47px] text-3xl font-['Righteous'] gradient-text">
                        Forgot Password
                    </h2>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
