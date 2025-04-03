import express from "express";
import { getAllUsers, login, register } from "../contorllers/user.controller.js";

const userRouter = express.Router();


// Route to register a new user
userRouter.post("/register" , register);

// Route to login a user
userRouter.post("/login" , login);
userRouter.get("/all" , getAllUsers);

export default userRouter;