import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const AuthCheck = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
