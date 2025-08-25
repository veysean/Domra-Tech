import React, { useState } from "react";

export default function RequestChangingForm({ onCancel }) {
  const [formData, setFormData] = useState({
    EnglishWord: "",
    KhmerWord: "",
    FrenchWord: "",
    WordReference: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-[657px] p-7 bg-gradient-to-l from-indigo-500/50 to-purple-800/50 rounded-[30px] shadow-lg inline-flex flex-col justify-center items-center gap-7">
      <div className="self-stretch h-10 text-center justify-start text-white text-3xl font-bold font-['Inter']">
        Request Changing
      </div>

      <form
        onSubmit={handleSubmit}
        className="self-stretch p-7 bg-white rounded-3xl flex flex-col justify-end items-end gap-11"
      >
        {/* English Word */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            English Word
          </label>
          <input
            type="text"
            name="EnglishWord"
            value={formData.EnglishWord}
            onChange={handleChange}
            placeholder="Enter New English word"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Khmer Word */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            Khmer Word
          </label>
          <input
            type="text"
            name="KhmerWord"
            value={formData.KhmerWord}
            onChange={handleChange}
            placeholder="Enter New Khmer word"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* French Word */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            French Word
          </label>
          <input
            type="text"
            name="FrenchWord"
            value={formData.FrenchWord}
            onChange={handleChange}
            placeholder="Enter New French word"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word Reference */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            Word Reference
          </label>
          <input
            type="text"
            name="WordReference"
            value={formData.WordReference}
            onChange={handleChange}
            placeholder="Enter New word reference"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="inline-flex justify-start items-center gap-[5px]">
          <button
            type="button"
            className="w-24 h-10 rounded-[20px] bg-gray-500 text-white text-base font-medium font-['Inter'] hover:bg-gray-200"
            onClick={() => {
              setFormData({
                EnglishWord: "",
                KhmerWord: "",
                FrenchWord: "",
                WordReference: "",
              });
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-24 h-10 rounded-[20px] bg-indigo-500 text-white text-base font-medium font-['Inter'] hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
