import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import excelRoutes from "./routes/excelRoutes.js";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // 👈 important

app.use("/api/auth", authRoutes);
app.use("/api/excel", excelRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});