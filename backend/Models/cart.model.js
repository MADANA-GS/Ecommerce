import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1, // Default quantity is 1
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
