import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { userServices } from "../../api"; // adjust path as needed

const UserEdit = ({ user, onClose, onSave, saving, error, success }) => {
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "user", // optional if you support roles
  });

  useEffect(() => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: user?.role || "user",
    });
  }, [user]);

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
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <BsXLg size={18} />
        </button>

        {/* Title */}
        <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">Edit User</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">Update user details.</p>
          <p className="text-sm text-green-700 font-medium">
            User ID <span className="text-green-700">{user.userId}</span>
          </p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {["firstName", "lastName", "email"].map((field, i) => (
            <div key={field}>
              <label className="text-sm font-semibold text-[#667EEA] mb-1 block">
                {["First Name", "Last Name", "Email"][i]}
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

        {/* Optional Role Selector */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-2 rounded bg-blue-20 border border-blue-100 w-full text-sm focus:ring-2 focus:ring-blue-200"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
