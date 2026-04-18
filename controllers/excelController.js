// controllers/excelController.js

import XLSX from "xlsx";
import ImportUser from "../models/ImportUser.js";

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = XLSX.utils.sheet_to_json(sheet);

    if (!data.length) {
      return res.status(400).json({ message: "Empty file" });
    }

    // ✅ Clean + Validate
    const users = data
      .map((item) => ({
        name: item.name || item.Name,
        mobile: String(item.mobile || item.Mobile),
        sourceFile: req.file.originalname,
        uploadedBy: req.user?._id,
      }))
      .filter((u) => u.name && u.mobile); 

    if (!users.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const result = await ImportUser.insertMany(users, {
      ordered: false,
    });

    res.json({
      message: "Upload successful",
      total: users.length,
      inserted: result.length,
    });

  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};