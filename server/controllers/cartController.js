// const Emoji = require('../models/emojiModel');
const cartController = {};
const createErr = require('../util/error.js');
const Cart = require('../models/cartModel');

let cartID = 0;

cartController.initializeCart = (req, res, next) => {
  if (req.cookies.hasOwnProperty('cartID')) return next();
  Cart.create({
    id: cartID,
    items: [],
    total: 0
  })
    .then(doc => {
      console.log('cart created:', doc);
      res.locals.id = doc.id;
      cartID++;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while initializing the cart', 500));
  });
};

module.exports = cartController;