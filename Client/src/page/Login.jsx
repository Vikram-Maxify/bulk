import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../reducer/slice/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user, success } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (success && user) {
            navigate("/dashboard");
            dispatch(resetState());
        }
    }, [success, user, navigate, dispatch]);

    useEffect(() => {
        if (success && user) {
            toast.success("Login successful 🎉");
            navigate("/dashboard");
            dispatch(resetState());
        }

        if (error) {
            toast.error(error);
            dispatch(resetState());
        }
    }, [success, user, error, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-300 text-center mt-4">{error}</p>
                )}

                <p className="text-center text-gray-200 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-white font-semibold cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;