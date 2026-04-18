import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user, success } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const { name, email, mobile, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, mobile, password }));
    };

    useEffect(() => {
        if (success && user) {
            navigate("/dashboard"); // 👉 change route if needed
            dispatch(resetState());
        }
    }, [success, user, navigate, dispatch]);

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile"
                    value={mobile}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Register;