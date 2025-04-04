import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../contorllers/cart.controler.js";
import { AuthCheck } from "../middelwares/AuthCheck.js";


const cartRouter = express.Router();

cartRouter.post("/add",AuthCheck, addToCart);
cartRouter.delete("/delete",AuthCheck, removeFromCart);
cartRouter.delete("/clear",AuthCheck, clearCart);
cartRouter.get("/all",AuthCheck, getCart);
cartRouter.post("/update",AuthCheck, updateQuantity);

export default cartRouter;
