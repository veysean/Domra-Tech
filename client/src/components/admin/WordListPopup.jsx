import React from "react";
import { BsXLg } from "react-icons/bs";

const WordListPopup = ({ word, onClose }) => {
  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[600px] relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <BsXLg size={18} />
        </button>

        {/* Title */}
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Word Details</h3>
        <div className="flex justify-between items-center mb-4">
            <div>
                <p className="text-sm text-gray-500">
                Quick overview of word details.
                </p>
            </div>
            <div>
                <p className="text-sm text-green-700 font-medium">
                    Word ID <span className="text-green-700"> {word.wordId}</span>
                </p>
            </div>
        </div>


        {/* Words Row */}
        <div className="grid grid-cols-3 gap-4">
            <div>
                <p className="text-sm font-semibold text-[#667EEA] mb-3">English</p>
                <p  className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">{word.EnglishWord}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-[#667EEA] mb-3">Khmer</p>
                <p className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">{word.KhmerWord}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-[#667EEA] mb-3">French</p>
                <p className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">{word.FrenchWord}</p>
            </div>
        </div>

        {/* Assigned Categories */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-500 mb-2 block">Categories</label>
          <div className="flex flex-wrap gap-2 mt-3">
            {word.Categories && word.Categories.length > 0 ? (
              word.Categories.map((cat) => (
                <span
                  key={cat.categoryId}
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-lg text-xs font-medium shadow-sm hover:from-blue-200 hover:to-blue-300 transition"
                >
                  {cat.categoryName}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs italic">No categories assigned</span>
            )}
          </div>
        </div>

        {/* Definition */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Definition</h2>
          <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            {word.definition || "No definition yet"}
          </p>
        </div>

        {/* Example */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-3">Example</p>
          <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            {word.example || "No example yet"}
          </p>
        </div>

        {/* Reference */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-5">Reference</p>
          {word.reference ? (
            <a
              href={word.reference}
              target="_blank"
              rel="noopener noreferrer"
              className=" mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 text-blue-600 text-sm font-medium hover:underline transition-shadow"
            >
              Open Link
            </a>
          ) : (
            <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">No reference</p>
          )}
        </div>

        {/* Dates */}
        <div className="text-[12px] text-gray-400 mt-8 border-t border-gray-200 pt-2 flex justify-between">
          <p>Created: {new Date(word.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(word.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WordListPopup;
