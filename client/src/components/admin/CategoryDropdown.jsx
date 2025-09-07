import React, { useState, useRef } from "react";
import { BsFilterRight } from "react-icons/bs";

const CategoryDropdown = ({ categories, selectedCategory, setSelectedCategory, className = "" }) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const dropdownTimeout = useRef();


  const selectedName =
    selectedCategory && categories.find((c) => c.categoryId === +selectedCategory)
      ? categories.find((c) => c.categoryId === +selectedCategory).categoryName
      : "All Categories";

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsOpen(false); // close after selection
  };


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
      {/* Dropdown button */}
      <button
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left bg-white hover:border-blue-500 flex justify-between items-center"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedName}</span>
        <span className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <BsFilterRight />
        </span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          key="all"
          onClick={() => handleSelect("")}
          className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
            selectedCategory === "" ? " bg-gray-100" : ""
          }`}
        >
          All Categories
        </button>
        {(categories || []).map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() => handleSelect(cat.categoryId)}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              selectedCategory == cat.categoryId ? " bg-gray-100" : ""
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
