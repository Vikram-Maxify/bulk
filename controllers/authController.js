import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// 🍪 Helper
const sendToken = (user, res) => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // 👉 production me true
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};



// 📝 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const exists = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (exists) {
      return res.status(400).json({ message: "User exists" });
    }

    // 🔐 HASH
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    sendToken(user, res);

    res.status(201).json({
      user,
      message: "Registered successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    sendToken(user, res);

    res.json({
      user,
      message: "Login successful",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🚪 LOGOUT
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out" });
};