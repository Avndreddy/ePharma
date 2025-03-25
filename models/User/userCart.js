const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  Products: [
    { 
      Product_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
        unique: true
      },
      Quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      Price: {
        type: Number,
        required: true,
      },
      ItemPrice: {
        type: Number,
      },
    },
  ],
  // Total: {
  //   type: Number,
  // },
});


// // Middleware to calculate Total_Price and Total on save
// cartSchema.pre('save', function (next) {
//   this.Products.forEach(product => {
//     // Calculate the Total_Price for each product based on Quantity * Price
//     product.Total_Price = product.Quantity * product.Price;
//   });

//   // // Calculate the total sum of all products in the cart
//   // this.Total = this.Products.reduce((sum, product) => sum + product.Total_Price, 0);

//   next();
// });


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
