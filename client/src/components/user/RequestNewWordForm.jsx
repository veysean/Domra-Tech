import React, { useState } from "react";
import {WordRequestServices} from '../../api';
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
    <div className="w-[657px] p-7 bg-gradient-to-l from-indigo-500/50 to-purple-800/50 rounded-[30px] shadow-lg inline-flex flex-col justify-center items-center gap-7">
      <div className="self-stretch h-10 text-center justify-start text-white text-3xl font-bold font-['Inter']">
        Add New Term
      </div>
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="self-stretch p-3 rounded-lg text-sm font-medium bg-green-100 text-green-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="self-stretch p-3 rounded-lg text-sm font-medium bg-red-100 text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="self-stretch p-7 bg-white rounded-3xl flex flex-col gap-10"
      >
        {/* English Word */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            English Word
          </label>
          <input
            type="text"
            name="newEnglishWord"
            value={formData.newEnglishWord}
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
            name="newKhmerWord"
            value={formData.newKhmerWord}
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
            name="newFrenchWord"
            value={formData.newFrenchWord}
            onChange={handleChange}
            placeholder="Enter New French word"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word example */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            Word Example
          </label>
          <input
            type="text"
            name="newExample"
            value={formData.newExample}
            onChange={handleChange}
            placeholder="Enter New word example"
            className="self-stretch h-10 px-3 rounded-xl outline-1 outline-gray-300 text-gray-500 text-sm font-['Inter'] hover:outline-indigo-500"
          />
        </div>

        {/* Word definition*/}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <label className="self-stretch text-gray-700 text-xl font-normal font-['Inter']">
            Word Definition
          </label>
          <input
            type="text"
            name="newDefinition"
            value={formData.newDefinition}
            onChange={handleChange}
            placeholder="Enter New word definition"
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
            className="w-24 h-10 rounded-[20px] bg-gray-500 text-white text-base font-medium font-['Inter'] hover:bg-gray-300"
            onClick={() =>{
              handleClear();
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