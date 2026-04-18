import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Settings = () => {
  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Profile */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Profile</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-2 border border-border rounded-xl"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-border rounded-xl"
            />
          </div>

          <button className="mt-4 px-4 py-2 rounded-xl bg-primary text-white">
            Save Changes
          </button>
        </div>

        {/* WhatsApp API */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            WhatsApp API Connection
          </h2>

          <input
            type="text"
            placeholder="API Key / Token"
            className="w-full px-4 py-2 border border-border rounded-xl"
          />

          <button className="mt-4 px-4 py-2 rounded-xl bg-primary text-white">
            Connect API
          </button>
        </div>

        {/* Billing */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Billing</h2>

          <p className="text-sm text-textLight">
            Current Plan: <span className="font-semibold text-text">Growth</span>
          </p>

          <button className="mt-4 px-4 py-2 rounded-xl border border-border">
            Upgrade Plan
          </button>
        </div>

        {/* Password */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Change Password
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="px-4 py-2 border border-border rounded-xl"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-2 border border-border rounded-xl"
            />
          </div>

          <button className="mt-4 px-4 py-2 rounded-xl bg-primary text-white">
            Update Password
          </button>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Settings;