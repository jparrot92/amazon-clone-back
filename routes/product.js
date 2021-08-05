const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

// POST request - create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// GET request - create all product
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("owner category").exec();
    res.json({
      status: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// GET request - get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .exec();
    res.json({
      status: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// PUT request - update a single product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.file.location,
          description: req.body.description,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );
    res.json({
      status: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// DELETE request - delete a single product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
