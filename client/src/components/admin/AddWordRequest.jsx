import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";

const AddWordRequest = ({ onClose, onAdd, saving, error, success }) => {
  const [form, setForm] = useState({
    newEnglishWord: "",
    newKhmerWord: "",
    newFrenchWord: "",
    newDefinition: "",
    newExample: "",
    reference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.newEnglishWord.trim()) return;

    const payload = {
      newEnglishWord: form.newEnglishWord.trim(),
      newKhmerWord: form.newKhmerWord.trim() || null,
      newFrenchWord: form.newFrenchWord.trim() || null,
      newDefinition: form.newDefinition.trim() || null,
      newExample: form.newExample.trim() || null,
      reference: form.reference.trim() || null,
    };

    if (onAdd) onAdd(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-[600px] max-w-full relative animate-fadeIn"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <BsXLg size={18} />
        </button>

        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Request a New Word</h3>

        {/* Required English Word */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-[#667EEA] block">English Word *</label>
          <input
            name="newEnglishWord"
            value={form.newEnglishWord}
            onChange={handleChange}
            className="p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm"
            required
          />
        </div>

        {/* Optional Fields */}
        {["newKhmerWord", "newFrenchWord", "newDefinition", "newExample", "reference"].map((field) => (
          <div key={field} className="mb-3">
            <label className="text-sm font-semibold text-gray-500 block">
              {field === "reference" ? "Reference Link" : field.replace("new", "")}
            </label>
            <textarea
              name={field}
              value={form[field]}
              onChange={handleChange}
              rows={2}
              className="p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm"
            />
          </div>
        ))}

        {/* Feedback */}
        {error && <div className="text-sm text-red-500 text-center mb-3">{error}</div>}
        {success && <div className="text-sm text-green-600 text-center mb-3">{success}</div>}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            disabled={saving}
          >
            {saving ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWordRequest;
