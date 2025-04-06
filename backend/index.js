import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/connectDB.js";
import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.routes.js";
import cartRouter from "./Routes/cart.routes.js";
import adressRouter from "./Routes/adress.controller.js";

dotenv.config();

const app = express();

// ✅ Middleware Order Matters!
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Parses JSON request body
app.use(bodyparser.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cookieParser()); // Parses cookies

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// ✅ User Routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", adressRouter);

// ✅ Start Server
app.listen(process.env.PORT || 3000, async () => {
  await connectDB();
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
