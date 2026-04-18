// ================= NAVBAR ================= //
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducer/slice/authSlice.js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out 👋");
        navigate("/login");
    };

    const linkStyle = (path) =>
        `block px-4 py-2 rounded-lg text-sm transition ${location.pathname === path
            ? "bg-primary/10 text-primary"
            : "text-textLight hover:bg-surface hover:text-text"
        }`;

    return (
        <>
            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
                        <h1 className="text-lg font-semibold text-text">WAMarketing</h1>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {user && (
                            <>
                                <Link to="/dashboard" className={linkStyle("/dashboard")}>
                                    Dashboard
                                </Link>
                                <Link to="/history" className={linkStyle("/history")}>
                                    History
                                </Link>
                                <Link to="/profile" className={linkStyle("/profile")}>
                                    Profile
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-surface text-text font-semibold border border-border">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="hidden md:block px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm shadow hover:scale-105 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="hidden md:block px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm shadow hover:scale-105 transition"
                            >
                                Login
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="w-64 h-full bg-white p-6 shadow-lg">

                        {/* Close */}
                        <div className="flex justify-end mb-6">
                            <button onClick={() => setMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-2">
                            {user && (
                                <>
                                    <Link to="/dashboard" className={linkStyle("/dashboard")} onClick={() => setMenuOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Link to="/history" className={linkStyle("/history")} onClick={() => setMenuOpen(false)}>
                                        History
                                    </Link>
                                    <Link to="/profile" className={linkStyle("/profile")} onClick={() => setMenuOpen(false)}>
                                        Profile
                                    </Link>
                                </>
                            )}

                            <div className="mt-6">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
