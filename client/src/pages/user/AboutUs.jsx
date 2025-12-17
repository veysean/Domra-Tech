import React from 'react';
import { Link } from 'react-router-dom';
import PictureCard from '../../components/user/PictureCard';
import image from '../../assets/loginPic.png'; 
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation("aboutUs");

    const actions = [
        { key: 'search', path: '/' },
        { key: 'translate', path: '/' },
        { key: 'contribute', path: '/contribute-term' }
    ];

    return (
        <div className="flex flex-col items-center justify-start gap-10">
            {/* Header */}
            <div className="h-10 lg:h-24 w-full flex justify-around items-center main-color overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 opacity-30 text-white text-3xl font-extrabold hidden md:block">{t('aboutUs')}</div>
                ))}
            </div>

            {/* Vision and Mission */}
            <div className="w-full max-w-[1156px] flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-2xl lg:text-4xl font-extrabold text-main-color">{t('visionMissionHeader')}</div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 w-full">
                    <div className="group w-full md:w-150 h-72 p-7 bg-white rounded-[30px] outline-1 outline-slate-200 flex flex-col gap-10 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center text-3xl font-medium text-main-color group-hover:font-bold">{t('vision')}</div>
                        <div className="text-center lg:text-xl text-slate-600">{t('visionDes')}</div>
                    </div>
                    <div className="group w-full md:w-150 h-72 p-7 bg-white rounded-[30px] outline-1 outline-slate-200 flex flex-col gap-10 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center text-3xl font-medium text-main-color group-hover:font-bold">{t('mission')}</div>
                        <div className="text-center lg:text-xl text-slate-600">{t('missionDes')}</div>
                    </div>
                </div>
            </div>

            {/* How Domra Works */}
            <div className="w-full max-w-[1156px] flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-4xl font-extrabold">
                    <span className="text-main-color">{t('how')} </span>
                    <span className="text-main-color2 font-['Righteous']">{t('domra')}</span>
                    <span className="text-main-color"> {t('work')}</span>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    {actions.map(({ key, path }) => (
                        <Link to={path} key={key}>
                            <div className="group w-full p-5 bg-white rounded-[20px] outline-1 outline-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                <div className="text-3xl font-medium text-main-color group-hover:font-bold">{t(key)}</div>
                                <div className="text-xl text-slate-600">{t(`${key}Des`)}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Domra Team */}
            <div className="w-full max-w-[1156px] mb-10 flex flex-col justify-center items-center gap-10 md:gap-20">
                <div className="text-center text-4xl font-extrabold">
                    <span className="text-main-color">{t('meet')} </span>
                    <span className="text-main-color2 font-['Righteous']">{t('domra')}</span>
                    <span className="text-main-color"> {t('team')}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <PictureCard name={t('himSoklong')} role={t('advisor')} />
                    <PictureCard name={t('kemVeysean')} role={t('backend')} />
                    <PictureCard name={t('tangSonika')} role={t('backend')} />
                    <PictureCard name={t('inChanaliza')} role={t('backend')} />
                    <PictureCard name={t('oengGechty')} role={t('frontend')} />
                    <PictureCard name={t('sarSovannita')} role={t('frontend')} />
                    <PictureCard name={t('chumChanlinna')} role={t('frontend')} />
                </div>
            </div>
        </div>
    );
}
