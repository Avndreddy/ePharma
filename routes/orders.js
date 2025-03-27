const express = require("express");
const Cart = require("../models/User/userCart");
const router = express.Router();
const { checkForbiddenAccess } = require("../utils/forbiddenAccess");
const { verifyToken } = require("../utils/JWT");
const {
  createOrder,
  getAllOrdersOfAUser,
  getAOrderByID,
  deleteAnOrderByID,
  updateOrderStatusByID,
  updateOrderShippingDetailsByID
} = require("../controllers/orders");
const permittedUserRole = ["Customer", "Admin", "Distributor"];

router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    checkForbiddenAccess(userId, req, permittedUserRole[0]);
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllOrdersOfAUser/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    checkForbiddenAccess(userId, req, permittedUserRole);
    const order = await getAllOrdersOfAUser(userId);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAOrderBy/:userId/:orderId", verifyToken, async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    checkForbiddenAccess(userId, req, permittedUserRole);
    const order = await getAOrderByID(orderId);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/updateOrderStatusBy/:userId/:orderId", verifyToken, async (req, res) => {
  try {
    const { orderId, userId } = req.params;
    const SpecialAccesstoOnly = permittedUserRole.slice(1,3)
    checkForbiddenAccess(userId, req, SpecialAccesstoOnly);
    const order = await updateOrderStatusByID(orderId, req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/updateOrderAddressBy/:userId/:orderId", verifyToken, async (req, res) => {
    try {
      const { userId, orderId } = req.params;
      checkForbiddenAccess(userId, req, permittedUserRole.slice(0,1));
      const order = await updateOrderShippingDetailsByID(orderId, req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.delete("/deleteAnOrderBy/:userId/:orderId", verifyToken, async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    checkForbiddenAccess(userId, req, permittedUserRole.slice(0,2));
    const order = await deleteAnOrderByID(orderId);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
