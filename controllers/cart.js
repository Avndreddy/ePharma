const Cart = require("../models/User/userCart");
const { calculateEachItemPrice } = require("../utils/calculateEachItemPrice");
const Product = require("../models/product");
const mongoose = require("mongoose");

const emptyCart = {Products: [], TotalPrice: 0 }

async function createCart(id, req) {
   let products = req.body.Products;
   if(products){
   products = calculateEachItemPrice(products)
}
   try{
    const checkCart = await Cart.findOne({ userId: id });
   if (!checkCart) {
    const newCart = new Cart({ userId: id, Products: [...products] });
    await newCart.save();
    return newCart;
   }else{
    checkCart.Products = products;
    await checkCart.save();
    return checkCart;
   }
   }catch(error){
    console.log(error);
    return error;
   }
}

async function getCart(id) {
    try {
        
        let cart = await Cart.findOne({ userId: id }).lean();
        console.log(cart?.Products, !cart?.Products.length)
        if (!cart?.userId) {
            cart = new Cart({...emptyCart, userId: id});
            await cart.save();
            return cart;
        }
       if(!cart?.Products.length){
        return cart
       }
            
        const productIds = cart?.Products.map(item => item.Product_ID);

        // Fetch products and convert them to plain objects
        const products = await Product.find({ _id: { $in: productIds } })
            .select("-Distributor_ID -Expiry_Date -Batch_Number -Manufacturer -Storage_Instructions -Stock_Availability -More_Info")
            .lean(); // Ensure no Mongoose document metadata
        // Merge cart items with product details
        let sum = 0;
        cart = cart?.Products?.map(orderProduct => {
            const productInfo = products.find(p => p._id.toString() === orderProduct.Product_ID.toString());
            const cleanProductInfo = productInfo ? JSON.parse(JSON.stringify(productInfo)) : {}; // Remove any hidden properties
            sum = orderProduct.ItemPrice + sum;
            return {
                ...orderProduct,
                ...cleanProductInfo
            };
        });
        cart.push({TotalPrice: sum})
        return cart; 
            
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deleteCart(id) {
    try {
        let cart = await Cart.findOneAndDelete({userId: id})
        cart = new Cart({...emptyCart, userId: id});
        await cart.save();
        return cart;
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = { createCart, getCart, deleteCart };
