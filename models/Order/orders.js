const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Products: [
      {
        Product_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        Product_Name: {
          type: String,
          required: true,
        },
        Category: {
          type: String,
          required: true,
        },
        Quantity: {
          type: Number,
          required: true,
        },
        Price: {
          type: Number,
          required: true,
        },
        ItemPrice: {
          type: Number,
          required: true,
        },
        Discount: {
          type: Number,
          default: 0,
        },
        Images: {
          type: String,
        },
      },
    ],
    shippingDetails: {
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
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderNote: {
      type: String,
      default: "",
    },
    useDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
