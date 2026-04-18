import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🌐 Base URL
const API = "http://localhost:5000/api/users";

// 📝 REGISTER
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post(`${API}/register`, userData, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post(`${API}/login`, userData, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// 🚪 LOGOUT
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await axios.post(`${API}/logout`, {}, { withCredentials: true });
            return true;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// 🧠 SLICE
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.success = false;
            });
    },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;