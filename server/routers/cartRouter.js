const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const cartController = require('../controllers/cartController.js');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SK);

router.get('/', cartController.initializeCart, (req, res) => {
  if (!req.cookies.hasOwnProperty('cartID')) {
    res.cookie('cartID', res.locals.id);
  }
  res.status(200).send('cart initialized.');
});

router.get('/myCart', cartController.getCartById, (req, res) => {
  res.json(res.locals.cart);
});

router.post('/', cartController.addToCart, (req, res) => {
  res.json(res.locals.updatedCart);
});

router.delete('/:itemName', cartController.removeItem, (req, res) => {
  res.json(res.locals.newCart);
});

router.get('/allCarts', cartController.getAllCarts, (req, res) => {
  res.json(res.locals.carts);
});

router.post('/create-checkout-session', cartController.getCartById, async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:8080'; // PROBABLY CHANGE FOR PRODUCTION
  const cart = res.locals.cart;
  console.log('cart.items:', cart.items);
  const line_items = cart.items.map((el) => {
    // return { price: 'pr' + el.price, quantity: 1 };
    console.log(el.priceID);
    return { price: el.priceID, quantity: 1};

  });
  console.log('line_items:', line_items);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

module.exports = router;