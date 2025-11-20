import React, { useState } from "react";
import guidline1 from "../../assets/guidline1.png";
import guidline2 from "../../assets/guidline2.png";
import guidline3 from "../../assets/guidline3.png";
import { useTranslation } from 'react-i18next';
export default function GuidLine() {
  const { t } = useTranslation('contributeTerm');
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: t("step01"),
      desc: t("step1_desc"),
      img: guidline1,
    },
    {
      title: t("step02"),
      desc: t("step2_desc"),
      img: guidline2,
    },
    {
      title: t("step03"),
      desc: t("step3_desc"),
      img: guidline3,
    },
  ];

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col rounded-2xl border border-slate-200 justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="text-center text-[#3F51B5] text-2xl sm:text-3xl md:text-4xl font-extrabold">
        {t('guideline')}
      </div>

      {/* Step Content */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 w-full">
        {/* Text */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          <div className="pl-4 border-l-4 border-[#E4A54D] flex flex-col gap-2">
            <div className="text-[#3F51B5] text-xl sm:text-2xl font-bold">
              {steps[step - 1].title}
            </div>
            <div className="text-[#3F51B5] text-base sm:text-lg md:text-xl font-normal">
              {steps[step - 1].desc}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img
            className="w-full h-auto object-contain rounded-xl shadow-md"
            src={steps[step - 1].img}
            alt="guideline"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-4 sm:px-5 py-2 rounded-[20px] text-white text-sm sm:text-lg font-medium transition ${
            step === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "main-color2 hover:bg-[#DD9229]"
          }`}
        >
          {t('previous')}
        </button>
        <button
          onClick={handleNext}
          disabled={step === steps.length}
          className={`px-4 sm:px-5 py-2 rounded-[20px] text-white text-sm sm:text-lg font-medium transition ${
            step === steps.length
              ? "bg-gray-400 cursor-not-allowed"
              : "main-color2 hover:bg-[#DD9229]"
          }`}
        >
          {t('Next')}
        </button>
      </div>
    </div>
  );
}
