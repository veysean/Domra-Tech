import React from "react";
import { BsXLg } from "react-icons/bs";

const WordRequestPopup = ({ request, onClose }) => {
  if (!request) return null;

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
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Word Request Details</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">Submitted word request overview</p>
          <p className="text-sm text-green-700 font-medium">
            Request ID <span className="text-green-700">{request.wordRequestId}</span>
          </p>
        </div>

        {/* Words Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold text-[#667EEA] mb-3">English</p>
            <p className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">
              {request.newEnglishWord}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#667EEA] mb-3">Khmer</p>
            <p className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">
              {request.newKhmerWord}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#667EEA] mb-3">French</p>
            <p className="mb-4 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 transition-shadow">
              {request.newFrenchWord}
            </p>
          </div>
        </div>

        {/* Definition */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Definition</h2>
          <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            {request.newDefinition || "No definition provided"}
          </p>
        </div>

        {/* Example */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-3">Example</p>
          <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            {request.newExample || "No example provided"}
          </p>
        </div>

        {/* Reference */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-5">Reference</p>
          {request.reference ? (
            <a
              href={request.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 text-blue-600 text-sm font-medium hover:underline transition-shadow"
            >
              Open Link
            </a>
          ) : (
            <p className="mb-3 p-3 rounded-lg bg-blue-20 border-l-4 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              No reference provided
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Status */}
        <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">Status</p>
            <p className="p-2 rounded bg-gray-100 text-sm capitalize">{request.status}</p>
        </div>

        {/* Check as Checkbox */}
        <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">Check</p>
            <div className="p-2 rounded bg-gray-100 text-sm flex items-center gap-2">
            <input
                type="checkbox"
                checked={request.check}
                onChange={() => handleToggleCheck(request)}
                className="cursor-pointer"
            />
            <span>{request.check ? "Checked" : "Unchecked"}</span>
            </div>
        </div>
        </div>


        {/* Dates */}
        <div className="text-[12px] text-gray-400 mt-8 border-t border-gray-200 pt-2 flex justify-between">
          <p>Created: {new Date(request.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(request.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WordRequestPopup;
