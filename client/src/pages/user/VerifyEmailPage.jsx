//client/src/user/VerifyEmaulPage
import React from 'react';
import VerifyEmail from "../../components/user/verifyEmail";

const VerifyEmailPage = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-l from-indigo-500/50 to-purple-800/50 overflow-hidden">
            <div className="w-[505px] h-[549px] relative rounded-[30px]">
                <div className="w-[505px] h-[200px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                    <VerifyEmail />
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;