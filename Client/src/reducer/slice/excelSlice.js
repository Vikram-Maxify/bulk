import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 🔥 Async thunk (API call)
export const uploadExcelFile = createAsyncThunk(
  "excel/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(
        "/excel/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMyUsers = createAsyncThunk(
  "excel/getMyUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/excel/my-users",
        {
          withCredentials: true, // agar cookie auth hai
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const excelSlice = createSlice({
  name: "excel",
  initialState: {
    loading: false,
    success: false,
    error: null,
    users: [],     // ✅ FIX
    total: 0,
  },
  reducers: {
    resetExcelState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.users = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // UPLOAD
      .addCase(uploadExcelFile.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(uploadExcelFile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Upload failed";
      })

      // GET USERS
      .addCase(getMyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyUsers.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ HANDLE BOTH CASES
        state.users = action.payload.users || action.payload.data || [];
        state.total = action.payload.total || 0;
      })
      .addCase(getMyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed";
      });
  },
});

export const { resetExcelState } = excelSlice.actions;
export default excelSlice.reducer;