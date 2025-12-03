import { BsSearch, BsTrash, BsPencilSquare, BsCaretDownFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import {userServices} from '../../api'
import UserEdit from "../../components/admin/EditUserCard";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null); // userId to delete
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  // Fetch users on component mount and page change
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const res = await userServices.getAll(page, 60); 
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Filter + Search Logic with priority on firstName (first letter match)
  const filteredUsers = users
    .filter((user) => {
      if (!search) return true;

      const firstName = user.firstName?.toLowerCase() || "";
      const lastName = user.lastName?.toLowerCase() || "";
      const id = String(user.userId).toLowerCase();
      const searchValue = search.toLowerCase();

      if (firstName.startsWith(searchValue)) return true;
      return firstName.includes(searchValue) || lastName.includes(searchValue) || id.includes(searchValue);
    })
    .sort((a, b) => {
      const searchValue = search.toLowerCase();
      const aStarts = a.firstName?.toLowerCase().startsWith(searchValue);
      const bStarts = b.firstName?.toLowerCase().startsWith(searchValue);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

    // Delete user
  const handleDelete = async (id) => {
    try {
      await userServices.deleteUser(id);
      setConfirmDelete(null);
      fetchUsers(page);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit user (placeholder)
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
    setError("");
    setSuccess("");
  };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      await userServices.updateUser(selectedUser.userId, formData);
      setSuccess("User updated successfully!");
      setShowEdit(false);
      fetchUsers(page); // refresh list
    } catch (err) {
      setError("Failed to update user.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold my-5 text-[#4A5568]">
        Welcome to Domra, Admin!
      </h1>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        
        {/* Search + Filter */}
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-full px-10 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-[#E2E8F0]-500"
            />
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-none rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">ID</th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">First Name</th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">Last Name</th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-4 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{user.userId}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{user.firstName}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{user.lastName}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{user.email}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-center">
                  <div className="flex justify-center gap-5">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-gray-600 hover:text-green-700 "
                    >
                      <BsPencilSquare />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(user.userId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <BsTrash />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}  
      {showEdit && (
        <UserEdit
          user={selectedUser}
          onClose={() => setShowEdit(false)}
          onSave={handleSave}
          saving={saving}
          error={error}
          success={success}
        />
      )}
    
    </div>
    </div>
  );
};

export default UserPage;
