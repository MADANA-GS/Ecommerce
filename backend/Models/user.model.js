import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
export default User;
