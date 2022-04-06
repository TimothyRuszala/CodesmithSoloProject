const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const cartController = require('../controllers/cartController.js');
const router = express.Router();

router.get('/', cartController.initializeCart, (req, res) => {
  console.log(req.cookies.cartID);
  console.log(req.cookies);
  if (!req.cookies.hasOwnProperty('cartID')) {
    res.cookie('cartID', res.locals.id);
  }
  res.status(200).send('cart initialized.');
});

module.exports = router;