import React, { useState } from "react";
import { CorrectionServices } from "../../api";

export default function RequestChangingForm({ onCancel, wordId }) {
  const [formData, setFormData] = useState({
    wordId: wordId,
    correctEnglishWord: "",
    correctFrenchWord: "",
    correctKhmerWord: "",
    reference: "",
    status: "pending",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CorrectionServices.requestCorrection(formData);
      console.log("Form Submitted:", response.data);
      setSuccessMessage("✅ Request submitted successfully!");
      setErrorMessage("");

      // Reset form
      setFormData({
        wordId: wordId,
        correctEnglishWord: "",
        correctFrenchWord: "",
        correctKhmerWord: "",
        reference: "",
        status: "pending",
      });

      // Auto-close form after a delay
      setTimeout(() => {
        setSuccessMessage("");
        onCancel();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("❌ Failed to submit request. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-white w-[450px] md:w-[600px] lg:w-[657px] rounded-[30px]">
      <div className="w-[450px] md:w-[600px] lg:w-[657px] p-7 bg-gradient-to-l from-indigo-500/50 to-purple-800/50 rounded-[30px] shadow-lg inline-flex flex-col justify-center items-center gap-7">
        <div className="self-stretch h-10 text-center justify-start text-white text-2xl lg:text-3xl font-bold font-['Inter']">
          Request Changing
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
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal font-['Inter']">
              English Word
            </label>
            <input
              type="text"
              name="correctEnglishWord"
              value={formData.correctEnglishWord}
              onChange={handleChange}
              placeholder="Enter New English word"
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
            />
          </div>

          {/* Khmer Word */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal font-['Inter']">
              Khmer Word
            </label>
            <input
              type="text"
              name="correctKhmerWord"
              value={formData.correctKhmerWord}
              onChange={handleChange}
              placeholder="Enter New Khmer word"
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
            />
          </div>

          {/* French Word */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal font-['Inter']">
              French Word
            </label>
            <input
              type="text"
              name="correctFrenchWord"
              value={formData.correctFrenchWord}
              onChange={handleChange}
              placeholder="Enter New French word"
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
            />
          </div>

          {/* Word Reference */}
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <label className="self-stretch text-gray-700 text-base lg:text-xl font-normal font-['Inter']">
              Word Reference
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Enter New word reference"
              className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="inline-flex justify-start items-center gap-[5px]">
            <button
              type="button"
              className="w-24 h-10 rounded-[20px] bg-gray-500 text-white text-sm lg:text-base font-medium font-['Inter'] hover:bg-gray-600"
              onClick={() => {
                setFormData({
                  wordId: wordId,
                  correctEnglishWord: "",
                  correctFrenchWord: "",
                  correctKhmerWord: "",
                  reference: "",
                  status: "pending",
                });
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 h-10 rounded-[20px] bg-indigo-500 text-white text-sm lg:text-base font-medium font-['Inter'] hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
