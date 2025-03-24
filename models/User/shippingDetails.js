const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shippingDetails: [
      {
        customerName: {
          type: String,
          required: true,
        },
        customerContactInfo: {
          type: Number,
          required: true,
        },
        customerEmail: {
          type: String,
          required: true,
        },
        customerAddress: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Shipping = mongoose.model("Shipping", ShippingSchema);

module.exports = Shipping;
