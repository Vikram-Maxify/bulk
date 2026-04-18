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
    console.log(data)

    if (!data.length) {
      return res.status(400).json({ message: "Empty file" });
    }

    // ✅ Clean + Validate
    const users = data
      .map((item) => ({
        name: item.name || item.Name,
        mobile: Number(item.mobile || item.Phone),
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

// controllers/excelController.js

export const getMyImportedUsers = async (req, res) => {
  try {
    const userId = req.user?._id;

    const users = await ImportUser.find({ uploadedBy: userId })
      .sort({ createdAt: -1 });

    res.json({
      total: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getSingleImportedUser = async (req, res) => {
  try {
    const user = await ImportUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

