const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emojiSchema = require('./emojiModel.js');

const cartSchema = new Schema({
  id: Number, // use with cookies
  items: [Object],
  total: Number
});

module.exports = mongoose.model('Cart', cartSchema);