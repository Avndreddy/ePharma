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
      required:true
    },
    Outlet_GSTNO:{
      type:String,
      required:true
    },
    Password:{
      type:String,
      required:true
    }
  });
  
  const AccountHolder = mongoose.model('User', accountHolderSchema);
  module.exports = AccountHolder;