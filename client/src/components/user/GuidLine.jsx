import React, { useState } from "react";
import guidline1 from "../../assets/guidline1.png";
import guidline2 from "../../assets/guidline2.png";
import guidline3 from "../../assets/guidline3.png";

export default function GuidLine() {
  const [step, setStep] = useState(1);

  // Example guideline data
  const steps = [
    {
      title: "Step 01",
      desc: "Navigate to home page and search your preferred word.",
      img: guidline1,
    },
    {
      title: "Step 02",
      desc: "Click on the word to view details and click on request.",
      img: guidline2,
    },
    {
      title: "Step 03",
      desc: "Input all the required informations and click  submit to improve your translation and wait for review.",
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
    <div className="w-[1156px] m-auto px-5 pt-10 pb-10 inline-flex flex-col rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200  justify-center items-center gap-10">
      <div className="self-stretch text-center gradient-text text-4xl font-extrabold font-['Inter']">
        Improve Translation Guidelines
      </div>

      {/* Step Content */}
      <div className="flex flex-col justify-start items-start gap-7">
        <div className="self-stretch pl-5 border-l-[3px] border-indigo-500 inline-flex justify-center items-start gap-12">
          <div className="w-50 h-9 text-indigo-500 text-2xl font-bold font-['Inter']">
            {steps[step - 1].title}
          </div>
          <div className="w-150 text-indigo-500 text-xl font-normal font-['Inter']">
            {steps[step - 1].desc}
          </div>
        </div>
        <div className="w-96 h-72 p-2.5 flex flex-col justify-start items-start gap-2.5">
          <img
            className="self-stretch flex-1 object-contain"
            src={steps[step - 1].img}
            alt="guideline"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-5">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-5 py-2 rounded-[20px] text-white text-lg font-medium ${
            step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={step === steps.length}
          className={`px-5 py-2 rounded-[20px] text-white text-lg font-medium ${
            step === steps.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
