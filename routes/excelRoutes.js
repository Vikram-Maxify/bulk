// routes/excelRoutes.js

import express from "express";
import upload from "../middleware/upload.js";
import { uploadExcel } from "../controllers/excelController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Protected route (optional)
router.post("/upload-excel", protect, upload.single("file"), uploadExcel);

export default router;