import React from "react";
import { FiEdit} from "react-icons/fi";

const WordTable = ({ words }) => {
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
          {words.map((word, index) => (
            <tr key={word.wordId} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{word.wordId.toString().padStart(3, "0")}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{word.EnglishWord}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{word.FrenchWord}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{word.KhmerWord}</td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">{word.definition}</td>
              <td className="px-6 py-4 text-center flex justify-center gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FiEdit size={18} />
                </button>
              </td>
            </tr>
          ))}
          {words.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No words found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WordTable;
