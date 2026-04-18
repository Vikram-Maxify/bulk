// routes/excelRoutes.js

import express from "express";
import upload from "../middleware/upload.js";
import { getMyImportedUsers, getSingleImportedUser, uploadExcel } from "../controllers/excelController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// 🔒 Protected route (optional)
router.post("/upload-excel", protect, upload.single("file"), uploadExcel);

router.get("/my-users", protect, getMyImportedUsers);

// 🔍 Get single user by ID
router.get("/user/:id", protect, getSingleImportedUser);

export default router;