import React, { useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import WordRequestEdit from "../admin/EditWordRequest";
import { WordRequestServices } from "../../api";
import WordRequestPopup from "../admin/WordRequestPopUp"; // Optional view modal

const WordRequestTable = ({ requests, setRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editRequest, setEditRequest] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleViewClick = (request) => {
    setSelectedRequest(request);
  };

  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  const handleEditClick = (request) => {
    setEditRequest(request);
    setError(null);
    setSuccess(null);
  };

  const handleCloseEdit = () => {
    setEditRequest(null);
    setError(null);
    setSuccess(null);
  };

  const handleSaveEdit = async (updatedRequest) => {
    setSaving(true);

    // Define allowed status values
    const validStatuses = ['pending', 'accepted', 'denied', 'deleted'];

    // // Validate status before sending
    // if (!validStatuses.includes(updatedRequest.status)) {
    //   setError(`Invalid status: "${updatedRequest.status}". Must be one of ${validStatuses.join(', ')}.`);
    //   setSaving(false);
    //   return;
    // }

    try {
      const res = await WordRequestServices.updateWordRequest(
        editRequest.wordRequestId,
        updatedRequest
      );

      const updated = res.data || { ...editRequest, ...updatedRequest };

      setRequests(prev =>
        prev.map(r =>
          r.wordRequestId === editRequest.wordRequestId ? updated : r
        )
      );

      setSuccess("Request updated successfully.");
      setEditRequest(null);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update request.");
    } finally {
      setSaving(false);
    }
  };


    const handleToggleCheck = (e) => {
        setIsChecked(e.target.checked);
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Check</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.isArray(requests) && requests.length > 0 ? (
            requests.map((req, index) => (
              <tr key={req.wordRequestId || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {req.wordRequestId ? req.wordRequestId.toString().padStart(3, "0") : ""}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{req.newEnglishWord}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{req.newFrenchWord || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{req.newKhmerWord || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">{req.status || "pending"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={req.check}
                        onChange={() => handleToggleCheck(req)}
                        className="cursor-pointer"
                    />
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    className="text-green-300 hover:text-green-700 text-xl p-1"
                    onClick={() => handleViewClick(req)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 text-xl p-1"
                    onClick={() => handleEditClick(req)}
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-400">
                No word requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Optional Modals */}
      {selectedRequest && (
        <WordRequestPopup request={selectedRequest} onClose={handleClosePopup} />
      )}
      {editRequest && (
        <WordRequestEdit
            request={editRequest}
            onClose={handleCloseEdit}
            onSave={handleSaveEdit}
            saving={saving}
            error={error}
            success={success}
        />
      )}
    </div>
  );
};

export default WordRequestTable;
