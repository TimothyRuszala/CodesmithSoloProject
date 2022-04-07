// const Emoji = require('../models/emojiModel');
const cartController = {};
const createErr = require('../util/error.js');
const Cart = require('../models/cartModel');


cartController.initializeCart = (req, res, next) => {
  // if user already has a cart, don't make a cart.
  if (req.cookies.hasOwnProperty('cartID')) {
    return next();
  }

  Cart.create({
    items: [],
    total: 0
  })
    .then(doc => {
      console.log('cart created:', doc);
      res.locals.id = doc._id;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while initializing the cart', 500));
  });
};

cartController.addToCart = (req, res, next) => {
  const cartID = req.cookies.cartID;
  const { emoticon, name, price } = req.body;
  const itemToAdd = { emoticon, name, price };
  Cart.findOneAndUpdate(
    { _id: cartID },
    { $push: {items: itemToAdd} }, // does this line work?
    { new: true },
  )
    .then(newCart => {
      console.log('cart updated:', newCart);
      res.locals.updatedCart = newCart;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while adding item to cart', 500));
    });
};

cartController.getAllCarts = (req, res, next) => {
  console.log('cartController.getAllCarts called');
  Cart.find({})
    .then(doc => {
      console.log('all carts found: ', doc);
      res.locals.carts = doc;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while getting all carts', 500));
    });
};

module.exports = cartController;