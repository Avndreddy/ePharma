const Product = require("../models/product");

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    return { message: "Error fetching products" };
  }
}

function getAllAvailableCategorys(){
  const categories = Product.schema.path('Category').enumValues;
  categories.push('Other')
  categories.sort()
  return categories;
}

async function getAllProductNameListByName(name) {
  try {
    const filter = { Product_Name: { $regex: name, $options: 'i' } };
    const productNames = await Product.distinct("Product_Name", filter);
    productNames.sort((a, b) => a.localeCompare(b));
    return productNames;
  } catch (error) {
    console.error("Error fetching product names:", error);
    return { message: "Error fetching product categories and names" };
  }
}

async function getProductsByID(id) {
  try {
    const products = await Product.findById(id);
    return products;
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}

async function getProductByCategory(category) {
  try {
    const products = await Product.find({ Category: category });
    return products;
  } catch (error) {
    return { message: "Error fetching products" };
  }
}

async function getProductByName(name) {
  try {
    const products = await Product.find({
      Product_Name: {
        $regex: new RegExp(name, "i"),
      },
    });
    return products;
  } catch (error) {
    return { message: "Error fetching products" };
  }
}

async function createAProduct(data) {
  try {
    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateProduct(id, data) {
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteProductBy(id) {
  try {
    return await Product.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getAllProducts,
  getAllProductNameListByName,
  getProductsByID,
  getProductByCategory,
  getProductByName,
  createAProduct,
  updateProduct,
  deleteProductBy,
};
