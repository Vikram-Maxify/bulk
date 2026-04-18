import React from "react";
import { LayoutDashboard, Users, Send, BarChart3, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {name: "Upload", path: "/upload", icon: Send},
    { name: "Contacts", path: "/contacts", icon: Users },
    { name: "Campaigns", path: "/campaigns", icon: Send },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 h-screen bg-white border-r border-border p-5 hidden md:block">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
                <h1 className="font-semibold text-text">WAMarketing</h1>
            </div>
            </Link>

            {/* Menu */}
            <div className="space-y-2">
                {menu.map((item, i) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;

                    return (
                        <Link
                            key={i}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition ${active
                                    ? "bg-primary/10 text-primary"
                                    : "text-textLight hover:bg-surface hover:text-text"
                                }`}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;