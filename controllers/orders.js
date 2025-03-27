const Order = require("../models/Order/orders");

async function createOrder(data) {
  const orderDetails = data;
  try {
    const order = new Order(orderDetails);
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getAllOrdersOfAUser(id) {
  try {
    const allOrders = await Order.find({ userId: id });
    return allOrders ? allOrders : "No Orders found";
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getAOrderByID(id) {
  try {
    const order = await Order.findById(id);
    return order ? order : "No Orders found";
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateOrderStatusByID(id, data) {
  try {
    data = { orderStatus: data.orderStatus };
    const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });
    return updatedOrder ? updatedOrder : "Order not found";
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateOrderShippingDetailsByID(id, data) {
  try {
  
    let orderDetails = await Order.findById(id);
    console.log(data)
    orderDetails.shippingDetails = {
      customerAddress:
        data?.customerAddress || orderDetails.shippingDetails.customerAddress,
      customerName:
        data?.customerName || orderDetails.shippingDetails.customerName,
      customerContactInfo:
        data?.customerContactInfo ||
        orderDetails.shippingDetails.customerContactInfo,
      customerEmail:
        data?.customerEmail || orderDetails.shippingDetails.customerEmail,
    };
    let updatedOrder = await orderDetails.save();
    return updatedOrder ? updatedOrder : "Order not found";
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteAnOrderByID(id) {
  try {
    const order = await Order.findByIdAndDelete(id).lean();
    return order ? order : "There is no Record with Id: " + id;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  createOrder,
  getAllOrdersOfAUser,
  getAOrderByID,
  updateOrderStatusByID,
  updateOrderShippingDetailsByID,
  deleteAnOrderByID,
};
