import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";

// Helper to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// ✅ Get cart by user
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: err.message,
    });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
        totalPrice: 0,
      });
    }

    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice = calculateTotalPrice(cart.products);
    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = calculateTotalPrice(cart.products);
    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error removing item",
      error: err.message,
    });
  }
};

// ✅ Update quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    cart.totalPrice = calculateTotalPrice(cart.products);
    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating quantity",
      error: err.message,
    });
  }
};

// ✅ Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: err.message,
    });
  }
};
