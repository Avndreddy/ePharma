const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Distributor_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Product_Name: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true,
    enum: ['Syrup', 'Ointments', 'Capsules', 'Tablets', 'Powders & Liquids', 'Surgical Items'],
    default: 'Other'
  },
  Qty: {
    type: Number,
    required: true,
    default: 1
  },
  Price: {
    type: Number,
    required: true
  },
  Discount: {
    type: Number,
    default: 0
  },
  Minimum_Order_Quantity: {
    type: Number,
    required: true,
    default: 1
  },
  Expiry_Date: {
    type: Date,
    required: true
  },
  Batch_Number: {
    type: String,
    required: true
  },
  Manufacturer: {
    type: String,
    required: true
  },
  Storage_Instructions: {
    type: String,
    required: false
  },
  Stock_Availability: {
    type: Boolean,
    required: true,
    default: true
  },
  More_Info: {
    type: String,
    required: true
  },
  Images: {
    type: String, // Changed to URL for image (more efficient)
    required: false
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;