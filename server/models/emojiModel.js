const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    name: { type: String },
    code: { type: String }
});

module.exports = mongoose.model('Emoji', emojiSchema);