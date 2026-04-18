import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Campaigns = () => {
  return (
    <DashboardLayout>

      <div className="bg-white border border-border rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-text mb-6">
          Create Campaign
        </h2>

        {/* Step 1 */}
        <div className="mb-4">
          <label className="text-sm text-textLight">Select Template</label>
          <select className="w-full mt-1 px-4 py-2 border border-border rounded-xl">
            <option>Promotion Message</option>
            <option>Reminder Message</option>
          </select>
        </div>

        {/* Step 2 */}
        <div className="mb-4">
          <label className="text-sm text-textLight">Select Contacts</label>
          <select className="w-full mt-1 px-4 py-2 border border-border rounded-xl">
            <option>All Contacts</option>
            <option>Leads</option>
          </select>
        </div>

        {/* Step 3 */}
        <div className="mb-6">
          <label className="text-sm text-textLight">Schedule</label>
          <input
            type="datetime-local"
            className="w-full mt-1 px-4 py-2 border border-border rounded-xl"
          />
        </div>

        {/* Button */}
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white">
          Send Campaign
        </button>

      </div>

    </DashboardLayout>
  );
};

export default Campaigns;