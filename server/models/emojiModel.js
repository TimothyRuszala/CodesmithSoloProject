const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    name: { type: String},
    description: String,
    code: { type: String },
    emoticon: String,
    price: { type: Number, default: 0.00005 }

});

module.exports = mongoose.model('Emoji', emojiSchema);