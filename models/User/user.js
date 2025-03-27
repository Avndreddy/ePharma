const mongoose = require('mongoose');
// User model
const accountHolderSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true
    },
    Address: {
      type: mongoose.Schema.Types.Mixed, // Flexible format for the address
      required: true
    },
    Pin_Code: {
      type: Number
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Contact_Info: {
      type: Number,
      required: true
    },
    Outlet_Name:{
      type:String,
    },
    Outlet_GSTNO:{
      type:String,
    },
    Password:{
      type:String,
      required:true
    },
    Role: {
      type: String,
      enum: ['Admin', 'Customer', 'Super Admin', 'Distributor'],
      required: true
      }
  });
  
  const AccountHolder = mongoose.model('User', accountHolderSchema);
  module.exports = AccountHolder;