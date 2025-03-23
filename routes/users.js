const express = require("express");
const router = express.Router();
const User = require("../models/User/user");
const { connectToDb, closeDbConnection } = require("../config/DBConnrect");
const { registerUser, login, updateUserDetails } = require("../controllers/register");
const { verifyToken } = require("../utils/JWT");

router.get("/loginUser", async (req, res) => {
  try {
    await connectToDb();
    // Create a new user document
    const token = await login(req)
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    await closeDbConnection();
  }
});

router.post("/createUser", async (req, res) => {
  try {
    await connectToDb();
    const user = await registerUser(req);

    if (user) {
      res.status(201).json({ message: "Registration Successful", user });
    } else {
      res.status(400).json({ message: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration Failed");
  }finally {
    await closeDbConnection();
  }
});

router.put("/updateUser/:id", verifyToken,async (req, res) => {
  const id  = req.params?.id;
  const updates = req.body;
  if(id.toString() !== req.user.id.toString()){
    res.status(403).send('Forbiden access')
  }
  try {
    await connectToDb();
    const updateDetails = await updateUserDetails(id, updates);
    if (updateDetails.status == 404) {
      return res.status(updateDetails.status).json({ message: updateDetails.error });
    }
    res.status(201).send(updateDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }finally {
    await closeDbConnection();
  }
});

module.exports = router;
