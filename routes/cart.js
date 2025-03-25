const express = require("express");
const Cart = require("../models/User/userCart");
const { connectToDb, closeDbConnection } = require("../config/DBConnrect");
const router = express.Router();
const { createCart, getCart, deleteCart } = require("../controllers/cart");
const { checkForbiddenAccess } = require("../utils/forbiddenAccess");
const { verifyToken } = require("../utils/JWT");

router.post("/addProductToCart/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    checkForbiddenAccess(id, req)
    const cart = await createCart(id, req);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getProductFromCart/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    checkForbiddenAccess(id, req)
      const cart = await getCart(id);
      res.status(200).send(cart);
    
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.delete("/deleteProductFromCart/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    checkForbiddenAccess(id, req)
      const cart = await deleteCart(id);
      res.status(200).send(cart);
    
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


module.exports = router;
