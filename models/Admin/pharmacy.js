const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    pharmacy_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    Outlet_Name: {
      type: String,
      required: true,
      unique: true
    },
    Seller_Name: {
      type: String,
      required: true
    },
    Seller_ID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    Contact_Info: {
      type: Number,
      required: true,
      unique: true
    },
    Location: {
      type: mongoose.Schema.Types.Mixed, // Allows flexibility in storing location info
      required: true
    },
    Pin_Code: {
      type: Number,
      required: true
    },
    Outlet_Pictures: {
      type: Buffer // Image storage as Binary Data
    },
    Available_Delivery: {
      type: Boolean,
      required: true,
      default: false
    },
    Store_Timings: {
      type: String, // Store timing as a string (e.g., "9:00 AM - 5:00 PM")
      required: true
    }
  });
  
  const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
  module.exports = Pharmacy;
  