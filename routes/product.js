const express = require("express");
const router = express.Router();

const {
  createAProduct,
  getAllProductNameListByName,
  getAllProducts,
  getManyProductsByID,
  getProductByCategory,
  getProductByName,
  getProductsByID,
  updateProduct,
  deleteProductBy,
} = require("../controllers/product");
const { verifyToken } = require("../utils/JWT");
const { checkForbiddenAccess } = require("../utils/forbiddenAccess");

router.get("/getAllProducts", async (req, res) => {
  try {
     
    const products = await getAllProducts();
    products ? res.json(products) : res.send("No Products in catalogue");
  } catch (err) {
    console.log(err);
  }   
});

router.get("/getAllProductNameListByName/:name", async (req, res) => {
  const {name} = req.params;
  try {  
    const products = await getAllProductNameListByName(name);
    !products.message ? res.json(products) : res.send(products.message);
  } catch (err) {
    console.log(err);
  }   
});

router.get("/getProductBy/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductsByID(id.toString());
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  }   
});

router.get("/getManyProductsByID", async (req, res) => {
  const {ids} = req.body;
  console.log(ids,typeof(ids))
  try {
    const product = await getManyProductsByID(ids);
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  }   
});

router.get("/getProductByCategory/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const product = await getProductByCategory(category)
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  }   
});

router.get("/getProductByName/:name", async (req, res) => {
  const { name } = req.params;
  try {
     
    const product = await getProductByName(name)
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  }   
});

router.post("/createAProduct", verifyToken,async (req, res) => {
  try {
    if (req.body) {
      const product = await createAProduct(req.body);
      res.status(201).send(product);
    } else {
      res.status(400).send({ message: "Invalid request" });
    }
  } catch (err) {
    res.status(500).send(err);
  }   
});

router.put("/updateProductBy/:id",verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await updateProduct(id, req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err);
  }   
});


router.delete("/deleteProductBy/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await deleteProductBy(id)
      product ? res.json(product) : res.send("Product not found");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
