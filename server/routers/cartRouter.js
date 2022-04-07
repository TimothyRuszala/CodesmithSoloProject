const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const cartController = require('../controllers/cartController.js');
const router = express.Router();

router.get('/', cartController.initializeCart, (req, res) => {
  if (!req.cookies.hasOwnProperty('cartID')) {
    res.cookie('cartID', res.locals.id);
  }
  res.status(200).send('cart initialized.');
});

router.post('/', cartController.addToCart, (req, res) => {
  res.json(res.locals.updatedCart);
});

router.get('/allCarts', cartController.getAllCarts, (req, res) => {
  res.json(res.locals.carts);
});

module.exports = router;