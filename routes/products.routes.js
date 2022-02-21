const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/products.routes');
router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    if (err) res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random * count);
    const dep = await Product.findById().skip(rand);
    if (!dep) res.status(404).json({ message: 'not found' });
    else res.json(dep);
  } catch (err) {
    if (err) res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const exp = await Product.findById(req.params.id);
    if (!exp) res.status(404).json({ message: 'not found' });
    else res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  const { name, client } = req.params.body;
  try {
    const newProduct = new Product({ name, client });
    newProduct.save();
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const exp = await Product.findById(req.params.id);
    if (!exp) res.status(404).json({ message: 'not found' });
    else {
      exp.name = name;
      exp.client = client;
      exp.save();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const exp = Product.finOne(req.params.id);
    if (!exp) res.status(404).json({ message: err });
    else exp.remove();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
