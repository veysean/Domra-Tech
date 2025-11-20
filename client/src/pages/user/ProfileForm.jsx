import { useState } from "react";
import { userServices } from "../../api";
import { useEffect } from "react";

export default function ProfileForm({ userData, setUserData }) {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
   useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || ""
      });
    }
  }, [userData]);

  const [message, setMessage] = useState(null); // success/error messages
  const [messageType, setMessageType] = useState("success"); // "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateProfile(formData);
      const updatedUser = await userServices.getProfile();
      setUserData(updatedUser.data);
      setMessage("Profile updated successfully");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
      setMessageType("error");
    }
  };
  

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // simple validations
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage("All password fields are required");
      setMessageType("error");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New password and confirm password do not match");
      setMessageType("error");
      return;
    }

    try {
      await userServices.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage("Password changed successfully");
      setMessageType("success");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage(error.response?.data?.message || "Failed to change password");
      setMessageType("error");
    }
  };

  return (
    <>
      <div className="text-indigo-500 text-2xl font-bold hidden lg:block">Your Profile</div>

      {/* Show messages */}
      {message && (
        <div
          className={`my-4 p-3 rounded-lg text-sm font-medium ${
            messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Edit Profile */}
      <div className="w-full max-w-lg my-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="w-full max-w-lg my-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}
