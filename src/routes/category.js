const router = require("express").Router();
const Category = require("../models/category");

// POST request
router.post("/categories", async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();

    res.json({
      status: true,
      message: "Successfuly created a new category",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// GET request
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      status: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
