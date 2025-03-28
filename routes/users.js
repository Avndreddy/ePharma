const express = require("express");
const router = express.Router();
const { registerUser, login, updateUserDetails } = require("../controllers/register");
const { verifyToken } = require("../utils/JWT");
const {checkForbiddenAccess} = require("../utils/forbiddenAccess");
let permittedUserRole = ["Customer","Admin", "Distributor"]

router.get("/loginUser", async (req, res) => {
  try {
    // Create a new user document
    const token = await login(req)
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }   
});

router.post("/createUser", async (req, res) => {
  try {
     
    const user = await registerUser(req);

    if (user) {
      res.status(201).json({ message: "Registration Successful", user });
    } else {
      res.status(400).json({ message: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration Failed");
  }  
});

router.put("/updateUser/:id", verifyToken,async (req, res) => {
  const id  = req.params?.id;
  const updates = req.body;

  try {
    checkForbiddenAccess(id, req, permittedUserRole);
    const updateDetails = await updateUserDetails(id, updates);
    if (updateDetails.status == 404) {
      return res.status(updateDetails.status).json({ message: updateDetails.error });
    }
    res.status(201).send(updateDetails);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }  
});

module.exports = router;
