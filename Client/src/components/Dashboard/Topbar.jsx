import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-white">

      {/* Title */}
      <h2 className="font-semibold text-text">Dashboard</h2>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-textLight">
          Credits: <span className="font-semibold text-text">{user?.credits || 0}</span>
        </div>

        <Link to="/profile" className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold hover:bg-primary/20 transition cursor-pointer">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Link>
      </div>
    </div>
  );
};

export default Topbar;