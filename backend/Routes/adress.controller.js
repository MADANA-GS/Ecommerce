import express from "express";
import { addAddress, deleteAddress, getAllAddress, getSingleAddress, updateAddress } from "../contorllers/adress.controler.js";
import { AuthCheck } from "../middelwares/AuthCheck.js";

const adressRouter = express.Router();


adressRouter.post("/add",AuthCheck, addAddress);
adressRouter.get("/all",AuthCheck, getAllAddress);
adressRouter.get("/get",AuthCheck, getSingleAddress);
adressRouter.delete("/delete",AuthCheck, deleteAddress);
adressRouter.post("/update",AuthCheck, updateAddress);

export default adressRouter;