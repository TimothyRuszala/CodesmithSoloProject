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
      // console.log('cart created:', doc);
      res.locals.id = doc._id;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while initializing the cart', 500));
  });
};

cartController.addToCart = (req, res, next) => {
  const cartID = req.cookies.cartID;
  const { emoticon, name, price, priceID } = req.body;
  const itemToAdd = { emoticon, name, price, priceID };
  Cart.findOneAndUpdate(
    { _id: cartID },
    { $push: {items: itemToAdd} }, // does this line work?
    { new: true },
  )
    .then(newCart => {
      // console.log('cart updated:', newCart);
      res.locals.updatedCart = newCart;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while adding item to cart', 500));
    });
};

cartController.getAllCarts = (req, res, next) => {
  // console.log('cartController.getAllCarts called');
  Cart.find({})
    .then(doc => {
      // console.log('all carts found: ', doc);
      res.locals.carts = doc;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while getting all carts', 500));
    });
};

cartController.getCartById = (req, res, next) => {
  // console.log('cartController.getCartById:', req.cookies);
  const cartID = req.cookies.cartID;
  Cart.findOne({ _id: cartID })
    .then(cart => {
      // console.log('cart found:', cart);
      res.locals.cart = cart;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while trying to find your cart', 500));
    });
};

cartController.removeItem = (req, res, next) => {
  const itemNameToDelete = req.params.itemName;
  const cartID = req.cookies.cartID;
  // console.log('itemNameToDelete:', itemNameToDelete);
  // console.log('cartID:', cartID);

  let updatedItems = [];
  // Yucky nested database queries!! Updating the list of items
  Cart.findOne(
    { _id: cartID }
  )
    .then(cart => {
      let oldItems = cart.items;
      for (let item of oldItems) {
        if (item.name !== itemNameToDelete) updatedItems.push(item);
      }
      console.log('updatedItems:', updatedItems);
      Cart.findOneAndUpdate(
        { _id: cartID },
        { items: updatedItems },
        { new: true }
      )
        .then(newCart => {
          console.log('newCart.items:', newCart.items);
          console.log('cart item deleted:', itemNameToDelete);
          res.locals.newCart = newCart;
          return next();
        });
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while trying to remove an item from cart', 500));
    });
};

module.exports = cartController;