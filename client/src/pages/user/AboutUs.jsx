import React from 'react';
import PictureCard from '../../components/user/PictureCard';
import image from '../../assets/loginPic.png'; 
import UserProfile from '../../components/user/UserProfile';
import { useTranslation } from 'react-i18next';

export default function AboutUs(){
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-start gap-10">
            <div className="h-24 w-full flex justify-around items-center bg-gradient-to-l from-indigo-500/80 to-purple-800/80 overflow-hidden">
                <div className="h-10  opacity-30 text-white text-3xl font-extrabold font-['Inter']">{t('aboutUs')}<br/></div>
                <div className="h-10  opacity-30 text-white text-3xl font-extrabold font-['Inter']">{t('aboutUs')}<br/></div>
                <div className="h-10  opacity-30 text-white text-3xl font-extrabold font-['Inter']">{t('aboutUs')}<br/></div>
            </div>
            {/* vision and mission part*/}
            <div className="w-[1156px] px-5 inline-flex flex-col justify-center items-center gap-20">
                <div className="self-stretch text-center justify-start gradient-text text-4xl font-extrabold font-['Inter']">Our Vision & Mission</div>
                <div className="self-stretch inline-flex justify-between items-center">
                    <div data-property-1="Default" className="group w-96 h-72 p-7 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-end gap-2.5 hover:shadow-lg transition-shadow duration-300">
                        <div className="self-stretch flex-1 text-center justify-start gradient-text text-3xl font-medium font-['Inter'] group-hover:font-bold">Vision</div>
                        <div className="self-stretch flex-1 text-center justify-start text-slate-600 text-base font-normal font-['Inter']">A world where knowledge is accessible in every language.</div>
                    </div>
                    <div data-property-1="Default" className="group w-96 h-72 p-7 bg-white rounded-[30px]  outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-end gap-2.5 hover:shadow-lg transition-show duration-300">
                        <div className="self-stretch flex-1 text-center justify-start gradient-text text-3xl font-medium font-['Inter'] group-hover:font-bold">Mission</div>
                        <div className="self-stretch flex-1 text-center justify-start text-slate-600 text-base font-normal font-['Inter']">To help researchers and students translate complex technical terms between English, Khmer, and French with accuracy and ease.</div>
                    </div>
                </div>
            </div>
            {/* about domra part */}
            <div className="w-[1156px] inline-flex flex-col justify-center items-center gap-20">
                <div className="self-stretch text-center justify-start"><span class="gradient-text text-4xl font-extrabold font-['Inter']">How </span><span class="text-indigo-500 text-4xl font-extrabold font-['Inter']">Domra</span><span class="gradient-text text-4xl font-extrabold font-['Inter']"> Work</span></div>
                <div className="self-stretch px-5 flex flex-col justify-start items-end gap-5">
                    <div data-property-1="Default" className="group self-stretch p-5 bg-white rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-between items-center hover:shadow-lg duration-300">
                        <div className="justify-start gradient-text text-3xl font-medium font-['Inter'] group-hover:font-bold">Search</div>
                        <div className="text-center justify-start text-slate-600 text-xl font-normal font-['Inter']">Find a technical term.</div>
                    </div>
                    <div data-property-1="Default" className="group self-stretch p-5 bg-white rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-between items-center hover:shadow-lg duration-300">
                        <div className="justify-start gradient-text text-3xl font-medium font-['Inter'] group-hover:font-bold">Translate</div>
                        <div className="text-center justify-start text-slate-600 text-xl font-normal font-['Inter']">View its meaning in English, Khmer, and French.</div>
                    </div>
                    <div data-property-1="Default" className="group self-stretch p-5 bg-white rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-between items-center hover:shadow-lg duration-300">
                        <div className="justify-start gradient-text text-3xl font-medium font-['Inter'] group-hover:font-bold">Contribute</div>
                        <div className="text-center justify-start text-slate-600 text-xl font-normal font-['Inter']">Suggest new terms to improve our dictionary.</div>
                    </div>
                </div>
            </div>
            {/* domra team part */}
            <div className="w-[1156px] inline-flex flex-col justify-center items-center gap-20">
                <div className="text-center justify-start"><span class="gradient-text text-4xl font-extrabold font-['Inter']">Meet </span><span class="text-indigo-500 text-4xl font-extrabold font-['Inter']">Domra</span><span class="gradient-text text-4xl font-extrabold font-['Inter']"> Team</span></div>
                <PictureCard imageSrc={image} name="Ms. hello lala" role="Frontend developer" />
                <div className="mb-10 flex flex-wrap justify-between items-center gap-10">
                    <PictureCard imageSrc={image} name="Mr. John Doe" role="Project Manager" />
                    <PictureCard imageSrc={image} name="Ms. Jane Smith" role="Backend Developer" />
                    <PictureCard imageSrc={image} name="Dr. Alice Johnson" role="Data Scientist" />
                </div>
                <div className="mb-10 flex flex-wrap justify-between items-center gap-10">
                    <PictureCard imageSrc={image} name="Dr. Alice Johnson" role="Data Scientist" />
                    <PictureCard imageSrc={image} name="Dr. Alice Johnson" role="Data Scientist" />
                    <PictureCard imageSrc={image} name="Dr. Alice Johnson" role="Data Scientist" />
                    <PictureCard imageSrc={image} name="Dr. Alice Johnson" role="Data Scientist" />
                </div>
            </div>
            <UserProfile profileURL={image} firstName="oeng" lastName="gechty" email="gechty@gmail.com"/>
        </div>
    );
}