// const {  } = require('react-router-dom');
const Emoji = require('../models/emojiModel');
const emojiController = {};
const createErr = require('../util/error.js');

emojiController.addEmoji = function (req, res, next) {
  console.log('emojiController.addEmoji called');
  console.log('req.body:', req.body);
  Emoji.create({
    name: req.body.name,
    emoticon: req.body.emoticon
  })
    .then((data) => {
      console.log('addEmoji: data created');
      res.locals.emoji = data;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while adding an emoji', 500));
    });
};

emojiController.getAllEmojis = (req, res, next) => {
  Emoji.find({})
    .then(emojis => {
      res.locals.emojis = emojis;
      return next();
    });
};

emojiController.updateEmoji = (req, res, next) => {
  console.log('emojiController req.body', req.body);
  Emoji.findOneAndUpdate(
    { name: req.body.oldName },
    {
      name: req.body.newName,
      description: req.body.newDescription,
      emoticon: req.body.newEmoticon,
      price: req.body.newPrice
    },
    {
      new: true // this should return the new emoji into the doc object
    }
  )
    .then(doc => {
      console.log('doc:', doc);
      res.locals.updated = doc;
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while updating', 500));
    });
};

emojiController.deleteEmoji = (req, res, next) => {
  console.log('deleteEmoji function hit');
  console.log('req.params:', req.params);

  Emoji.findOneAndDelete(
    { name: req.params.name }
  )
    .then(doc => {
      res.locals.deleted = doc;
      console.log('doc deleted:', doc);
      return next();
    })
    .catch(err => {
      return next(createErr(err, 'Something went wrong while deleting emoji', 500));
    });
};


module.exports = emojiController;