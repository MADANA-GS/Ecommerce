import express from "express";
import { getAllUsers, login, profile, register } from "../contorllers/user.controller.js";
import { AuthCheck } from "../middelwares/AuthCheck.js";

const userRouter = express.Router();


// Route to register a new user
userRouter.post("/register" , register);

// Route to login a user
userRouter.post("/login" , login);
userRouter.get("/all" , getAllUsers);
userRouter.get("/profile" ,AuthCheck, profile);

export default userRouter;