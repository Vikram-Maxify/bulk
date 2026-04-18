import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Phone, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import { logoutUser } from "../reducer/slice/authSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        { withCredentials: true }
      );
      
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-text">Please log in to view your profile</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text">My Profile</h1>
          <p className="text-textLight mt-1">Manage your account information</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white border border-border rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8 pb-8 border-b border-border">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-4xl font-bold shadow-md">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text">{user.name}</h2>
              <p className="text-textLight mt-1">{user.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <Shield size={16} className="text-primary" />
                <span className="text-sm font-semibold text-text capitalize">
                  {user.role || "User"}
                </span>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textLight mb-3">
                <Mail size={16} />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <p className="px-4 py-2 bg-surface rounded-xl text-text">
                  {user.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textLight mb-3">
                <Phone size={16} />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <p className="px-4 py-2 bg-surface rounded-xl text-text">
                  {user.mobile}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-textLight mb-3">
                <User size={16} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <p className="px-4 py-2 bg-surface rounded-xl text-text">
                  {user.name}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      mobile: user?.mobile || "",
                    });
                    setMessage("");
                  }}
                  className="px-6 py-2 border border-border text-text rounded-xl font-medium hover:bg-surface transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Credits Card */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-textLight">Available Credits</p>
              <h3 className="text-4xl font-bold text-primary mt-1">
                {user.credits || 0}
              </h3>
              <p className="text-sm text-textLight mt-2">
                Use credits to send campaigns and messages
              </p>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: "Account Status",
              value: "Active",
              icon: Shield,
              color: "bg-green-50 text-green-600 border-green-200",
            },
            {
              label: "Member Since",
              value: user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A",
              icon: User,
              color: "bg-blue-50 text-blue-600 border-blue-200",
            },
            {
              label: "Last Updated",
              value: user.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A",
              icon: User,
              color: "bg-purple-50 text-purple-600 border-purple-200",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`border rounded-2xl p-6 ${stat.color}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={20} />
                  <p className="text-sm font-semibold">{stat.label}</p>
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-red-600 mb-4">
            Once you log out, you'll need to log in again to access your account.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
