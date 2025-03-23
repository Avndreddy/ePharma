const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { connectToDb, closeDbConnection } = require("../config/DBConnrect");
const {
  createAProduct,
  getAllProductNameListByName,
  getAllProducts,
  getProductByCategory,
  getProductByName,
  getProductsByID,
  updateProduct,
  deleteProductBy,
} = require("../controllers/product");

router.get("/getAllProducts", async (req, res) => {
  try {
    await connectToDb();
    const products = await getAllProducts();
    products ? res.json(products) : res.send("No Products in catalogue");
  } catch (err) {
    console.log(err);
  } finally {
    await closeDbConnection();
  }
});

router.get("/getAllProductNameListByName/:name", async (req, res) => {
  const {name} = req.params;
  try {
    await connectToDb();
    const products = await getAllProductNameListByName(name);
    !products.message ? res.json(products) : res.send(products.message);
  } catch (err) {
    console.log(err);
  } finally {
    await closeDbConnection();
  }
});

router.get("/getProductBy/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connectToDb();
    const product = await getProductsByID(id.toString());
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  } finally {
    await closeDbConnection();
  }
});

router.get("/getProductByCategory/:category", async (req, res) => {
  const { category } = req.params;
  try {
    await connectToDb();
    const product = await getProductByCategory(category)
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  } finally {
    await closeDbConnection();
  }
});

router.get("/getProductByName/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await connectToDb();
    const product = await getProductByName(name)
    product ? res.json(product) : res.send("Product not found");
  } catch (err) {
    console.log(err);
  } finally {
    await closeDbConnection();
  }
});

router.post("/createAProduct", async (req, res) => {
  try {
    if (req.body) {
      await connectToDb();
      const product = await createAProduct(req.body);
      res.status(201).send(product);
    } else {
      res.status(400).send({ message: "Invalid request" });
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await closeDbConnection();
  }
});

router.put("/updateProductBy/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connectToDb();
    const product = await updateProduct(id, req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await closeDbConnection();
  }
});


router.delete("/deleteProductBy/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await connectToDb();
      const product = await deleteProductBy(id)
      product ? res.json(product) : res.send("Product not found");
    } catch (err) {
      console.log(err);
    } finally {
      await closeDbConnection();
    }
  });

module.exports = router;
