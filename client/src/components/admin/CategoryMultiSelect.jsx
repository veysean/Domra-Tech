import React, { useState, useRef } from "react";
import { BsFilterRight } from "react-icons/bs";

const CategoryMultiSelect = ({ categories, selectedCategories, setSelectedCategories, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const dropdownTimeout = useRef();

  const handleToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const selectedNames = categories
    .filter((c) => selectedCategories.includes(c.categoryId))
    .map((c) => c.categoryName)
    .join(", ") || "Select categories";

  return (
    <div
      className={`relative ${className || "w-60"}`}
      ref={dropdownRef}
      onMouseEnter={() => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        dropdownTimeout.current = setTimeout(() => setIsOpen(false), 200);
      }}
    >
      <button
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left bg-white hover:border-blue-500 flex justify-between items-center"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedNames}</span>
        <span className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : ""}`}><BsFilterRight /></span>
      </button>
      <div
        className={`absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {(categories || []).map((cat) => (
          <label
            key={cat.categoryId}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.categoryId)}
              onChange={() => handleToggle(cat.categoryId)}
              className="mr-2"
            />
            {cat.categoryName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryMultiSelect;
