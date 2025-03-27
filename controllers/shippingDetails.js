const Shipping = require("../models/User/shippingDetails");

async function getShippingDetails(id) {
  try {
    const shippingDetails = await Shipping.findOne({ userId: id.toString() });
    return shippingDetails ? shippingDetails : "There are no such records found";
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function createShippingDetails(userId,req) {
  try {
    const shippingDetails = req.body;
    let shipping = await Shipping.findOne({ userId: userId });
    if (shipping) {
      shipping.shippingDetails.push(shippingDetails);
      const updatedShipping = await shipping.save();
      return updatedShipping;
    }
    shipping = new Shipping({
      userId: userId,
      shippingDetails: [shippingDetails],
    });
    const savedShipping = await shipping.save();
    return savedShipping;
  } catch (error) {
    console.log(error)
    return error
  }
}

async function updateShippingDetails(userId, subId, req) {
  try {
    const recordExists = await Shipping.findOne({ userId: userId.toString() });
    const updateRecord = recordExists?.shippingDetails?.find((ele, index) => {
      return ele._id.toString() === subId.toString() ? ele : null;
    });
    if (!updateRecord) {
      return "There are no such sub-shipping record to delete";
    }
    const result = await Shipping.updateOne(
      {
        userId: userId,
        "shippingDetails._id": subId,
      },
      {
        $set: {
          "shippingDetails.$": {
            ...req.body,
            _id: subId,
          },
        },
      }
    );
    return result.modifiedCount > 0
      ? "Sub-shipping record updated successfully"
      : "No matching sub-shipping record found";
    s;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteShippingRecord(userId) {
  try {
    const deleted = await Shipping.deleteOne({ userId: userId });
    return deleted.deletedCount > 0
      ? "Shipping record deleted Successfully"
      : "There is no shipping record to delete";
  } catch (error) {
    return res.status(500).json({ message: "Error deleting shipping record" });
  }
}

async function deleteSubShippingRecord(userId, subId) {
  try {
    const recordExists = await Shipping.findOne({
      userId: userId,
      "shippingDetails._id": subId,
    });
    if (!recordExists) {
      return "There are no such sub-shipping record to delete";
    }
    const deleted = await Shipping.updateOne(
      { userId: userId },
      { $pull: { shippingDetails: { _id: subId } } }
    );
    return deleted.modifiedCount > 0
      ? "Sub-shipping record deleted Successfully"
      : "Failed to delete sub-shipping record";
  } catch (error) {
    console.error("Error deleting sub-shipping record:", error);
    return res
      .status(500)
      .json({ message: "Error deleting Sub-shipping record" });
  }
}

module.exports = {
  getShippingDetails,
  createShippingDetails,
  updateShippingDetails,
  deleteShippingRecord,
  deleteSubShippingRecord,
};
