import React, { useState } from "react";
import {WordRequestServices} from '../../api';
import { useTranslation } from "react-i18next";
export default function RequestNewWordForm ({ onCancel, user }) {
    const [formData, setFormData] = useState({
        newEnglishWord: "",
        newFrenchWord: "",
        newKhmerWord: "",
        newDefinition: "",
        newExample: "",
        reference: "",
      });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation('contributeCard');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //handle clear form
  const handleClear = () => {
    setFormData({
      newEnglishWord: "",
      newFrenchWord: "",
      newKhmerWord: "",
      newDefinition: "",
      newExample: "",
      reference: "",
      status: "pending"
    });
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await WordRequestServices.createWordRequest(formData);
      console.log("Word request submitted:", response.data);
      setSuccessMessage("Word request submitted successfully!");
      setErrorMessage("");
      // Reset form or provide feedback to user
      handleClear();
      // Auto-close form after a delay
      setTimeout(() => {
        setSuccessMessage("");
        onCancel();
      }, 500);
      
    } catch (error) {
      console.error("Error submitting word request:", error);
      setErrorMessage("Failed to submit word request.");
      setSuccessMessage("");
    }
  };


return (
    <div className="w-full max-w-[657px] p-5 md:p-7 main-color from-indigo-500/50 to-purple-800/50 rounded-[30px] shadow-lg flex flex-col justify-center items-center gap-5 md:gap-7 mx-auto">
      <div className="w-full text-center text-white text-3xl md:text-4xl font-bold">
        {t('addNewTerm')}
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="w-full p-3 rounded-lg text-sm md:text-base font-medium bg-green-100 text-green-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="w-full p-3 rounded-lg text-sm md:text-base font-medium bg-red-100 text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full p-5 md:p-7 bg-white rounded-3xl flex flex-col gap-5 md:gap-10"
      >
        {/* English Word */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('engWord')}</label>
          <input
            type="text"
            name="newEnglishWord"
            value={formData.newEnglishWord}
            onChange={handleChange}
            placeholder={t('enterEng')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Khmer Word */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('khWord')}</label>
          <input
            type="text"
            name="newKhmerWord"
            value={formData.newKhmerWord}
            onChange={handleChange}
            placeholder={t('enterKh')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* French Word */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('french')}</label>
          <input
            type="text"
            name="newFrenchWord"
            value={formData.newFrenchWord}
            onChange={handleChange}
            placeholder={t('enterFr')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word Example */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('wEx')}</label>
          <input
            type="text"
            name="newExample"
            value={formData.newExample}
            onChange={handleChange}
            placeholder={t('enterEx')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word Definition */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('wDef')}</label>
          <input
            type="text"
            name="newDefinition"
            value={formData.newDefinition}
            onChange={handleChange}
            placeholder={t('enterDef')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word Reference */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-lg md:text-xl">{t('wRef')}</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder={t('enterRef')}
            className="w-full h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm md:text-base font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 mt-2">
          <button
            type="button"
            className="w-full sm:w-24 h-10 rounded-[20px] bg-gray-500 text-white text-base font-medium hover:bg-gray-300"
            onClick={() => {
              handleClear();
              onCancel();
            }}
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="w-full sm:w-24 h-10 rounded-[20px] main-color2 text-white text-base font-medium hover:bg-[#DD9229]"
          >
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
}