const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    name: { type: String},
    description: String,
    code: { type: String },
    emoticon: String,
    price: { type: Number, default: 300 },
    price_ID: String
});

module.exports = mongoose.model('Emoji', emojiSchema);