const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const secretKey = process.env.JWT_SECRET_KEY || "Avnd1"; // Secret key

async function generateToken(data) {
  try {
    const token = await jwt.sign(data, secretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

    async function verifyToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access Denied: No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Access Denied: Invalid token" });
    }
    }

module.exports = { verifyToken, generateToken };
