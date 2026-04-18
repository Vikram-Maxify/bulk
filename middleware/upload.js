// middleware/upload.js

import multer from "multer";

const storage = multer.memoryStorage(); // file RAM me aayegi

const upload = multer({
  storage,
  limits: { fileSize: 5000 * 1024 * 1024 }, // max 5MB
});

export default upload;