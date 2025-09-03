import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import WordsTable from "../../components/admin/WordsTable.jsx";
import Pagination from "../../components/admin/Pagination.jsx";
import { WordTranslationServices } from "../../api.js";
import { CategoryServices } from "../../api.js";
import CategoryDropdown from "../../components/admin/CategoryDropdown.jsx";
import AddWord from "../../components/admin/AddWord.jsx";

const WordTranslationPage = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  // Fetch words for a given page
  const fetchWords = async (page = 1, limit = 10, category = selectedCategory) => {
    setLoading(true);
    try {
      const res = await WordTranslationServices.findAll(page, limit, category);
      setWords(res.data.words || []);
      setCurrentPage(res.data.currentPage || page);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch words:", err);
      setError(err?.response?.data?.message || "Failed to fetch words");
    } finally {
      setLoading(false);
    }
  };

  // Search words
  const searchWords = async (query, page = 1, limit = 10, category = selectedCategory) => {
    setLoading(true);
    try {
      const res = await WordTranslationServices.searchWords(query, page, limit, category);
      // Support both array and object response
      if (Array.isArray(res.data)) {
        // Paginate manually in frontend
        const allWords = res.data;
        const pageSize = 10; // limit per page
        const totalPages = Math.max(1, Math.ceil(allWords.length / pageSize));
        const startIdx = (page - 1) * pageSize;
        const pagedWords = allWords.slice(startIdx, startIdx + pageSize);
        setWords(pagedWords);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } else {
        setWords(res.data.words || []);
        setCurrentPage(res.data.currentPage || page);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to search words:", err);
      setError(err?.response?.data?.message || "Failed to search words");
    } finally {
      setLoading(false);
    }
  };

  // categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await CategoryServices.getAll();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(err?.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchWords();
  }, []);

  // Refetch words when category or search changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchWords(searchQuery, 1, 10, selectedCategory);
    } else {
      fetchWords(1, 10, selectedCategory);
    }
    setCurrentPage(1);
  }, [selectedCategory]);

  // Handle page change
  const handlePageChange = (page) => {
    if (searchQuery.trim() !== "") {
      searchWords(searchQuery, page, 10, selectedCategory);
    } else {
      fetchWords(page, 10, selectedCategory);
    }
  };

  // Debounced search input handler
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        if (value.trim() !== "") {
          searchWords(value, 1, 10, selectedCategory);
        } else {
          fetchWords(1, 10, selectedCategory);
        }
        setCurrentPage(1);
      }, 400)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4 ">Word Translations</h1>
          <p className="text-gray-600">Manage and translate words in different languages.</p>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="border border-gray-300 rounded-lg p-2 pl-5 
                        hover:border-blue-500 focus:border-blue-500  focus:blue-500 outline-none transition-colors"
            />
            <FaSearch className="absolute ml-45 text-gray-400" />
          </div>
          <div>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 font-semibold text-white rounded-lg px-4 py-2 flex items-center"
              onClick={() => setShowAdd(true)}
            >
              <BsPlus className="mr-2 font-bold" />
              Add Word
            </button>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <>
            <WordsTable words={words} />
            <hr className="w-full border-t border-gray-100 my-4" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      {/* AddWord Popup */}
      {showAdd && (
        <AddWord
          onClose={() => {
            setShowAdd(false);
            setAddError(null);
            setAddSuccess(null);
          }}
          onAdd={async (form) => {
            setAddSaving(true);
            setAddError(null);
            setAddSuccess(null);
            try {
              // Ensure categories is an array of numbers
              const payload = {
                ...form,
                categories: Array.isArray(form.categories)
                  ? form.categories.map(Number)
                  : [],
              };
              const res = await WordTranslationServices.create(payload);
              setAddSuccess("Word added successfully.");
              setShowAdd(false);
              fetchWords(currentPage, 10, selectedCategory); // refresh table
            } catch (err) {
              setAddError(err?.response?.data?.message || "Failed to add word");
            } finally {
              setAddSaving(false);
            }
          }}
          saving={addSaving}
          error={addError}
          success={addSuccess}
        />
      )}
    </div>
  );
};

export default WordTranslationPage;
