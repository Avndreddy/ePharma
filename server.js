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
const Order = require('./routes/orders');

// MiddleWares
app.use(express.json());
app.use(cors());

// Connect to DB
connectToDb()

// use routes
app.use('/api',User)
app.use('/api',Product)
app.use('/api',Cart)
app.use('/api',Shipping)
app.use('/api',Order)

// Gracefully close MongoDB on process exit
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

// Server Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servre is running on port : ", PORT);
});
