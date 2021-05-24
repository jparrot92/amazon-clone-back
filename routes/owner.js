const router = require('express').Router();
const Owner = require('../models/owner');

// POST request
router.post('/owners', async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    await owner.save();

    res.json({
      status: true,
      message: "Successfuly created a new owner"
    });
  } catch(err){
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});

// GET request
router.get('/owners', async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      status: true,
      owners: owners
    });
  } catch(err){
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});

module.exports = router;
