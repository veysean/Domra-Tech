import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { WordRequestServices } from "../../api.js";
import WordRequestTable from "../../components/admin/WordRequestTable.jsx";
import Pagination from "../../components/admin/Pagination.jsx";
import AddWordRequest from "../../components/admin/AddWordRequest.jsx";

const WordRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  // Fetch word requests
  const fetchRequests = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await WordRequestServices.getWordRequests(page, limit, "", searchQuery);
      setRequests(res.data.data || []);
      setCurrentPage(res.data.currentPage || page);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch word requests:", err);
      setError(err?.response?.data?.message || "Failed to fetch word requests");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchRequests();
  }, []);

  // Refetch on search
  useEffect(() => {
    fetchRequests(1, 10);
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle page change
  const handlePageChange = (page) => {
    fetchRequests(page, 10);
  };

  // Debounced search input
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        fetchRequests(1, 10);
        setCurrentPage(1);
      }, 400)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">Word Requests</h1>
          <p className="text-gray-600">Manage user-submitted word requests for review and approval.</p>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="border border-gray-300 rounded-lg p-2 pl-5 hover:border-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            <FaSearch className="absolute ml-45 text-gray-400" />
          </div>
          <button
            className="bg-blue-500 font-semibold text-white rounded-lg px-4 py-2 flex items-center"
            onClick={() => setShowAdd(true)}
          >
            <BsPlus className="mr-2 font-bold" />
            Add Request
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <>
            <WordRequestTable requests={requests} setRequests={setRequests} />
            <hr className="w-full border-t border-gray-100 my-4" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Add Request Modal */}
      {showAdd && (
        <AddWordRequest
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
              const res = await WordRequestServices.createWordRequest(form);
              setAddSuccess("Request added successfully.");
              setShowAdd(false);
              fetchRequests(currentPage, 10); // refresh
            } catch (err) {
              setAddError(err?.response?.data?.message || "Failed to add request");
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

export default WordRequestPage;
