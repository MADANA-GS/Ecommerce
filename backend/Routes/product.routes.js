import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../contorllers/produt.controler.js";

const productRouter = express.Router();

// adding new product

productRouter.post("/add", addProduct);
productRouter.get("/all", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
