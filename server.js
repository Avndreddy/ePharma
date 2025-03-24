// Package Imports
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

// Import modules/routes
const {connectToDb, closeDbConnection} = require('./config/DBConnrect')
const User = require('./routes/users');
const Product = require("./routes/product");
const Cart = require('./routes/cart');
const Shipping = require('./routes/shippingDetails');

// MiddleWares
app.use(express.json());
app.use(cors());

// use routes
app.use('/api',User)
app.use('/api',Product)
app.use('/api',Cart)
app.use('/api',Shipping)

// Server Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servre is running on port : ", PORT);
});
