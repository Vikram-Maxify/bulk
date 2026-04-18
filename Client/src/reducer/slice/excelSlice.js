import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 Async thunk (API call)
export const uploadExcelFile = createAsyncThunk(
  "excel/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // agar auth use kar raha hai
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔥 Slice
const excelSlice = createSlice({
  name: "excel",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetExcelState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 loading
      .addCase(uploadExcelFile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ✅ success
      .addCase(uploadExcelFile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      // ❌ error
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Upload failed";
      });
  },
});

export const { resetExcelState } = excelSlice.actions;
export default excelSlice.reducer;