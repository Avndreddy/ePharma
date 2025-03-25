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

router.get("/getAShippingDetails/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    checkForbiddenAccess(id, req);
    const shippingDetails = await getShippingDetails(id);
    res.json(shippingDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/addAShippingDetails/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    checkForbiddenAccess(id, req);
    const shipping = await createShippingDetails(req);
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
      checkForbiddenAccess(id, req);
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
      checkForbiddenAccess(id, req);
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
      checkForbiddenAccess(id, req);
      const deleted = await deleteSubShippingRecord(userId, subId);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
