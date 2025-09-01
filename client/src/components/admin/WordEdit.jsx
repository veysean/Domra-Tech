import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";

// import { CategoryServices } from "../../api";
// import CategoryDropdown from "./CategoryDropdown";

const WordEdit = ({ word, onClose, onSave, saving, error, success }) => {
  const [form, setForm] = useState({
    EnglishWord: word?.EnglishWord || "",
    KhmerWord: word?.KhmerWord || "",
    FrenchWord: word?.FrenchWord || "",
    definition: word?.definition || "",
    example: word?.example || "",
    reference: word?.reference || "",
    // categories: word?.categories ? word.categories.map(c => c.categoryId) : [],
  });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     CategoryServices.getAll().then(res => {
//       setCategories(res.data || []);
//     });
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Edit Word</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">Update word details and categories.</p>
          <p className="text-sm text-green-700 font-medium">
            Word ID <span className="text-green-700">{word.wordId}</span>
          </p>
        </div>

        {/* Words Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {["EnglishWord", "KhmerWord", "FrenchWord"].map((field, i) => (
            <div key={field}>
              <label className="text-sm font-semibold text-[#667EEA] mb-1 block">
                {["English", "Khmer", "French"][i]}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mb-2 p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          ))}
        </div>

        {/* Categories
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Categories</label>
          <CategoryDropdown
            categories={categories}
            selectedCategory={form.categories}
            setSelectedCategory={(selected) => {
              let newCats = Array.isArray(selected) ? selected : [selected];
              if (typeof selected === "number" || typeof selected === "string") {
                const id = +selected;
                if (form.categories.includes(id)) {
                  newCats = form.categories.filter(c => c !== id);
                } else {
                  newCats = [...form.categories, id];
                }
              }
              setForm(prev => ({ ...prev, categories: newCats }));
            }}
            multiSelect={true}
          />
          <div className="flex flex-wrap gap-1 mt-2">
            {categories
              .filter(cat => form.categories.includes(cat.categoryId))
              .map(cat => (
                <span
                  key={cat.categoryId}
                  className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                >
                  {cat.categoryName}
                </span>
              ))}
            {form.categories.length === 0 && (
              <span className="text-gray-400 text-xs">No categories selected</span>
            )}
          </div>
        </div> */}

        {/* Definition */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Definition</label>
          <textarea
            name="definition"
            value={form.definition}
            onChange={handleChange}
            className="mb-3 p-3 rounded-lg bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
            rows={2}
          />
        </div>

        {/* Example */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Example</label>
          <textarea
            name="example"
            value={form.example}
            onChange={handleChange}
            className="mb-3 p-3 rounded-lg bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
            rows={2}
          />
        </div>

        {/* Reference */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Reference</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            className="mb-3 p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Feedback */}
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        {success && <div className="text-green-600 text-xs mb-2">{success}</div>}
        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 text-sm transition-colors"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WordEdit;