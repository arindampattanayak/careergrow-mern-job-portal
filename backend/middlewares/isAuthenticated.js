import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // ✅ Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // ✅ Set cookie with proper cross-site settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         // only over HTTPS
      sameSite: "None",     // cross-site cookie allowed
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
