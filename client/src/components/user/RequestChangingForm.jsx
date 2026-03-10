import { useState, useEffect } from "react";
import { CorrectionServices } from "../../api";
import {jwtDecode} from 'jwt-decode';
import { useTranslation } from "react-i18next";

export default function RequestChangingForm({ onCancel, word }) {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation('contributeCard');
  const [originalWord, setOriginalWord] = useState(null);
  const [formData, setFormData] = useState({
        wordId: "",
        correctEnglishWord: "",
        correctFrenchWord: "",
        correctKhmerWord: "",
        reference: "",
        status: "pending",
      });

  useEffect(() => {
  if (!word) return;

  const initialData = {
    wordId: word.wordId ?? "",
    correctEnglishWord: word.EnglishWord ?? "",
    correctFrenchWord: word.FrenchWord ?? "",
    correctKhmerWord: word.KhmerWord ?? "",
    reference: word.reference ?? "",
    status: "pending",
  };

  setOriginalWord(initialData);
  setFormData(initialData);
  setErrorMessage("");
  setSuccessMessage("");
}, [word]);


  const hasModifiedAtLeastOneField = () => {
    if (!originalWord || !formData) return false;

    return (
      originalWord.correctEnglishWord !== formData.correctEnglishWord ||
      originalWord.correctFrenchWord !== formData.correctFrenchWord ||
      originalWord.correctKhmerWord !== formData.correctKhmerWord ||
      originalWord.reference !== formData.reference
    );
  };



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!hasModifiedAtLeastOneField()) {
        setErrorMessage("Please modify at least one field before submitting.");
        return;
      }

      if (
        !formData.correctEnglishWord.trim() &&
        !formData.correctFrenchWord.trim() &&
        !formData.correctKhmerWord.trim()
      ) {
        setErrorMessage("Please fill at least one word field.");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");
      
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
      
        if (!userId) throw new Error("Invalid token: missing userId");

        const payload = { ...formData, userId };
          const response = await CorrectionServices.requestCorrection(payload);
          console.log("Form Submitted:", response.data);
          setSuccessMessage("Request submitted successfully!");
          setErrorMessage("");

        // Reset form
        setFormData(originalWord); 
        // Auto-close form after a delay
        setTimeout(() => {
          setSuccessMessage("");
          onCancel();
        }, 2000);
      } catch (error) {
        setErrorMessage(error.message || "Submission failed");
      }
  };

  return (
    <div className="bg-white w-[400px] md:w-[600px] lg:w-[657px] rounded-[30px]">
      <div className="w-[400px] md:w-[600px] lg:w-[657px] p-7 main-color from-indigo-500/50 to-purple-800/50 rounded-[30px] shadow-lg inline-flex flex-col justify-center items-center gap-7">
        <div className="self-stretch h-10 text-center justify-start text-white text-2xl lg:text-3xl font-bold">
          {t('requestTitle')}
        </div>

        {/* Success / Error Messages */}
        {successMessage && (
          <div className="w-full p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="self-stretch p-7 bg-white rounded-3xl flex flex-col justify-end items-end gap-11"
        >
          {/* English Word */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal">
              {t('engWord')}
            </label>
            <input
              type="text"
              name="correctEnglishWord"
              value={formData.correctEnglishWord}
              onChange={handleChange}
              placeholder={t('enterEng')}
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm hover:outline-indigo-500"
            />
          </div>

          {/* Khmer Word */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal ">
              {t('khWord')}
            </label>
            <input
              type="text"
              name="correctKhmerWord"
              value={formData.correctKhmerWord}
              onChange={handleChange}
              placeholder={t('enterKh')}
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm hover:outline-indigo-500"
            />
          </div>

          {/* French Word */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl">
              {t('french')}
            </label>
            <input
              type="text"
              name="correctFrenchWord"
              value={formData.correctFrenchWord}
              onChange={handleChange}
              placeholder={t('enterFr')}
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm hover:outline-indigo-500"
            />
          </div>

          {/* Word Reference */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal ">
              {t('wRef')}
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder={t('enterRef')}
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm hover:outline-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="inline-flex justify-start items-center gap-[5px]">
            <button
              type="button"
              className="w-24 h-10 rounded-[20px] bg-gray-500 text-white text-sm lg:text-base font-medium hover:bg-gray-600"
              onClick={() => {
                setFormData(originalWord);
                onCancel();
              }}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={!hasModifiedAtLeastOneField()}
              className={`w-24 h-10 rounded-[20px] text-white text-sm lg:text-base font-medium
              ${hasModifiedAtLeastOneField()
                ? "main-color2 hover:bg-[#DD9229]"
                : "bg-gray-400 cursor-not-allowed"}
            `}
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
