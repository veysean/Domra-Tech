import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";

const WordRequestEdit = ({ request, onClose, onSave, saving, error, success }) => {
  const initialForm = {
    wordRequestId: request?.wordRequestId || "",
    newEnglishWord: request?.newEnglishWord || "",
    newKhmerWord: request?.newKhmerWord || "",
    newFrenchWord: request?.newFrenchWord || "",
    newDefinition: request?.newDefinition || "",
    newExample: request?.newExample || "",
    reference: request?.reference || "",
    status: request?.status || "pending",
    check: request?.check || false,
  };

  const [form, setForm] = useState(initialForm);

  // Reset form when request changes or after successful save
  useEffect(() => {
    setForm(initialForm);
  }, [request, success]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-[600px] max-w-full relative animate-fadeIn"
        style={{ minWidth: 340 }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <BsXLg size={18} />
        </button>

        {/* Title */}
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Edit Word Request</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">Update submitted word request details.</p>
          <p className="text-sm text-green-700 font-medium">
            Request ID <span className="text-green-700">{form.wordRequestId}</span>
          </p>
        </div>

        {/* Words Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {["newEnglishWord", "newKhmerWord", "newFrenchWord"].map((field, i) => (
            <div key={field}>
              <label className="text-sm font-semibold text-[#667EEA] mb-1 block">
                {["English", "Khmer", "French"][i]}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mb-2 p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
                required={field === "newEnglishWord"}
              />
            </div>
          ))}
        </div>

        {/* Definition */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Definition</label>
          <textarea
            name="newDefinition"
            value={form.newDefinition}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
            rows={2}
          />
        </div>

        {/* Example */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Example</label>
          <textarea
            name="newExample"
            value={form.newExample}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
            rows={2}
          />
        </div>

        {/* Reference */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Reference</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            className="p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Status & Check */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 rounded bg-gray-100 border border-gray-300 w-full text-sm"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="denied">Denied</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="check"
              checked={form.check}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label className="text-sm font-semibold text-gray-500">Check</label>
          </div>
        </div>

        {/* Feedback */}
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        {success && <div className="text-green-600 text-xs mb-2">{success}</div>}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 text-sm transition-colors"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WordRequestEdit;
