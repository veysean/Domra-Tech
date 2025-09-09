import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { CategoryServices, WordTranslationServices } from "../../api";
import CategoryDropdown from "./CategoryDropdown";
import CategoryMultiSelect from "./CategoryMultiSelect";

const AddWord = ({ onClose, onAdd, saving, error, success }) => {
  const [form, setForm] = useState({
    EnglishWord: "",
    KhmerWord: "",
    FrenchWord: "",
    definition: "",
    example: "",
    reference: "",
    categories: [],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryServices.getAll().then(res => {
      setCategories(res.data || []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAdd) onAdd(form);
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
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Add Word</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">Enter word details and categories.</p>
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

        {/* Categories */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
              Categories
          </label>
          <p className="text-sm text-gray-500 mb-1">Select categories for the word.</p>
          <CategoryMultiSelect
            className="w-138"
            categories={categories}
            selectedCategories={form.categories}
            setSelectedCategories={(newCats) => setForm(prev => ({ ...prev, categories: newCats }))}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {categories
              .filter(cat => form.categories.includes(cat.categoryId))
              .map(cat => (
                  <span
                  key={cat.categoryId}
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-lg text-xs font-medium shadow-sm hover:from-blue-200 hover:to-blue-300 transition"
                  >
                  {cat.categoryName}
                  <button
                      type="button"
                      onClick={() =>
                      setForm(prev => ({
                          ...prev,
                          categories: prev.categories.filter(c => c !== cat.categoryId),
                      }))
                      }
                      className="ml-1 text-blue-600 hover:text-blue-900"
                  >
                      <BsXLg size={12} />
                  </button>
                  </span>
            ))}
            {form.categories.length === 0 && (
              <span className="text-gray-400 text-xs italic">
                  No categories selected
              </span>
            )}
          </div>
        </div>

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
            {saving ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWord;
