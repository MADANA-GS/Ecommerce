import Address from "../Models/adress.model.js";

export const addAddress = async (req, res) => {
  const { fullName, phone, pincode, address, city, state } = req.body;
  const userId = req.userId;
  try {
    if (!fullName || !phone || !pincode || !address || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newAdress = await Address.create({
      user: userId,
      fullName,
      phone,
      pincode,
      address,
      city,
      state,
    });
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAdress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding address",
      error: error.message,
    });
  }
};

export const getAllAddress = async (req, res) => {
  const userId = req.userId;
  try {
    const addresses = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.body;
  try {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  const { id, fullName, phone, pincode, address, city, state } = req.body;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        fullName,
        phone,
        pincode,
        address,
        city,
        state,
      },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  }
};
export const getSingleAddress = async (req, res) => {
  const { id } = req.body;
  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching address",
      error: error.message,
    });
  }
};
