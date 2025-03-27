const express = require("express");
const router = express.Router();
const Shipping = require("../models/User/shippingDetails");
const User = require("../models/User/user");
const { verifyToken } = require("../utils/JWT");
const { connectToDb } = require("../config/DBConnrect");
const {
  getShippingDetails,
  createShippingDetails,
  updateShippingDetails,
  deleteShippingRecord,
  deleteSubShippingRecord,
} = require("../controllers/shippingDetails");
const { checkForbiddenAccess } = require("../utils/forbiddenAccess");
const Fixed_Role = "Customer"


router.get("/getAShippingDetails/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    checkForbiddenAccess(userId, req, Fixed_Role);
    const shippingDetails = await getShippingDetails(userId);
    res.json(shippingDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/addAShippingDetails/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    checkForbiddenAccess(userId, req, Fixed_Role);
    const shipping = await createShippingDetails(userId,req);
    res.status(201).json(shipping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/updateAShippingDetails/:userId/:subId",
  verifyToken,
  async (req, res) => {
    const { userId, subId } = req.params;

    try {
      checkForbiddenAccess(userId, req, Fixed_Role);
      const shipping = await updateShippingDetails(userId, subId, req);
      res.status(201).json(shipping);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/deleteShippingRecord/:userId",
  verifyToken,
  async (req, res) => {
    const { userId } = req.params;

    try {
      checkForbiddenAccess(userId, req, Fixed_Role);
      const deleted = await deleteShippingRecord(userId);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/deleteSubShippingRecord/:userId/:subId",
  verifyToken,
  async (req, res) => {
    const { userId, subId } = req.params;

    try {
      checkForbiddenAccess(userId, req, Fixed_Role);
      const deleted = await deleteSubShippingRecord(userId, subId);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
