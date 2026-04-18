import React from "react";
import Sidebar from "../components/Dashboard/Sidebar"; 
import Topbar from "../components/Dashboard/Topbar"; 

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-surface min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;