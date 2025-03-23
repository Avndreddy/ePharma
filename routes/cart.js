const express = require("express");
const Cart = require("../models/User/userCart");
const { connectToDb, closeDbConnection } = require("../config/DBConnrect");
const router = express.Router();

router.post("/addProductToCart",async (req, res) => {
  const cart = new Cart(req.body);
  try {
    await connectToDb();
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }finally{
    await closeDbConnection();
  }
});

module.exports = router;
