import express from "express";
import { addAddress, getAllAddress } from "../contorllers/adress.controler.js";
import { AuthCheck } from "../middelwares/AuthCheck.js";

const adressRouter = express.Router();


adressRouter.post("/add",AuthCheck, addAddress);
adressRouter.get("/all",AuthCheck, getAllAddress);

export default adressRouter;