import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import excelRoutes from "./routes/excelRoutes.js";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectDB();

const app = express();

// ✅ Better CORS setup (dev + prod)
app.use(cors({
  origin: ["http://localhost:5173"], // add prod URL later
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/excel", excelRoutes);

// ✅ Serve frontend (only in production ideally)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client", "dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
  });
}
// ✅ Fallback PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});