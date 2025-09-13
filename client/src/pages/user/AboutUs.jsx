import React from 'react';
import PictureCard from '../../components/user/PictureCard';
import image from '../../assets/loginPic.png'; 
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation("aboutUs");

    return (
        <div className="flex flex-col items-center justify-start gap-10 px-4 md:px-0">
            {/* Header */}
            <div className="h-10 lg:h-24 w-full flex justify-around items-center bg-gradient-to-l from-indigo-500/80 to-purple-800/80 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 opacity-30 text-white text-3xl font-extrabold hidden md:block">{t('aboutUs')}</div>
                ))}
            </div>

            {/* Vision and Mission */}
            <div className="w-full max-w-[1156px] flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-2xl lg:text-4xl font-extrabold gradient-text">{t('visionMissionHeader')}</div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 w-full">
                    <div className="group w-full md:w-150 h-72 p-7 bg-white rounded-[30px] outline-1 outline-slate-200 flex flex-col gap-10 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center text-3xl font-medium gradient-text group-hover:font-bold">{t('vision')}</div>
                        <div className="text-center lg:text-xl text-slate-600">{t('visionDes')}</div>
                    </div>
                    <div className="group w-full md:w-150 h-72 p-7 bg-white rounded-[30px] outline-1 outline-slate-200 flex flex-col gap-10 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center text-3xl font-medium gradient-text group-hover:font-bold">{t('mission')}</div>
                        <div className="text-center lg:text-xl text-slate-600">{t('missionDes')}</div>
                    </div>
                </div>
            </div>

            {/* How Domra Works */}
            <div className="w-full max-w-[1156px] flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-4xl font-extrabold">
                    <span className="gradient-text">How </span>
                    <span className="text-indigo-500 font-['Righteous']">Domra</span>
                    <span className="gradient-text"> Work</span>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    {['search', 'translate', 'contribute'].map((action) => (
                        <div key={action} className="group w-full p-5 bg-white rounded-[20px] outline-1 outline-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-3xl font-medium gradient-text group-hover:font-bold">{t(action)}</div>
                            <div className="text-xl text-slate-600">{t(`${action}Des`)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Domra Team */}
            <div className="w-full max-w-[1156px] mb-10 flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-4xl font-extrabold">
                    <span className="gradient-text">Meet </span>
                    <span className="text-indigo-500 font-['Righteous']">Domra</span>
                    <span className="gradient-text"> Team</span>
                </div>
                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <PictureCard imageSrc={image} name="Mr. Him Soklong" role="Project Advisor" />
                    <PictureCard imageSrc={image} name="Ms. Kem Veysean" role="Backend Developer" />
                    <PictureCard imageSrc={image} name="Ms. Tang Sonika" role="Backend Developer" />
                    <PictureCard imageSrc={image} name="Ms. In Chanaliza" role="Backend Developer" />
                    <PictureCard imageSrc={image} name="Ms. Oeng Gechty" role="Frontend Developer" />
                    <PictureCard imageSrc={image} name="Ms. Sar Sovannita" role="Frontend Developer" />
                    <PictureCard imageSrc={image} name="Ms. Chum Chanlinna" role="Frontend Developer" />
                    <PictureCard imageSrc={image} name="Ms. Kon Sotheara" role="Frontend Developer" />
                </div>
            </div>
        </div>
    );
}
