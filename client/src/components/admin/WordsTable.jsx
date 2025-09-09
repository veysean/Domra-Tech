
import React, { useState } from "react";
import { WordTranslationServices } from "../../api";
import WordListPopup from "./WordListPopup";
import WordEdit from "./WordEdit";
import { FaEye, FaRegEdit } from "react-icons/fa";


const WordsTable = ({ words: initialWords }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [editWord, setEditWord] = useState(null);
  const [words, setWords] = useState(initialWords || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update local words if prop changes
  React.useEffect(() => {
    setWords(initialWords || []);
  }, [initialWords]);

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleClosePopup = () => {
    setSelectedWord(null);
  };

  const handleEditClick = async (word) => {
    setError(null);
    setSuccess(null);
    try {
      // Fetch the latest word info with categories from backend
      const res = await WordTranslationServices.findById(word.wordId);
      setEditWord(res.data);
    } catch (err) {
      setEditWord(word); // fallback to local if fetch fails
    }
  };

  const handleCloseEdit = () => {
    setEditWord(null);
    setError(null);
    setSuccess(null);
  };

  const handleSaveEdit = async (updatedWord) => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      // Ensure categories are sent as array of IDs
      const payload = { ...updatedWord, categories: updatedWord.categories };
      const res = await WordTranslationServices.update(editWord.wordId, payload);
      // Use backend response (with categories) if available
      const updated = res.data ? res.data : { ...editWord, ...updatedWord };
      setWords((prev) =>
        prev.map((w) => (w.wordId === editWord.wordId ? updated : w))
      );
      setSuccess("Word updated successfully.");
      setEditWord(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update word");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">English</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">French</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Khmer</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Definition</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.isArray(words) && words.length > 0 ? (
            words.map((word, index) => (
              <tr key={word.wordId || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {word.wordId ? word.wordId.toString().padStart(3, "0") : ""}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{word.EnglishWord}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{word.FrenchWord}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{word.KhmerWord}</td>
                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">
                  {word.definition || ""}
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    className="text-green-300 hover:text-green-700 text-xl p-1"
                    onClick={() => handleWordClick(word)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 text-xl p-1"
                    onClick={() => handleEditClick(word)}
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No words found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup components */}
      {selectedWord && (
        <WordListPopup word={selectedWord} onClose={handleClosePopup} />
      )}
      {editWord && (
        <WordEdit word={editWord} onClose={handleCloseEdit} onSave={handleSaveEdit} saving={saving} error={error} success={success} />
      )}
    </div>
  );
};

export default WordsTable;
