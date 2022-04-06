const { createRoutesFromChildren } = require('react-router-dom');
const Emoji = require('../models/emojiModel');
const emojiController = {};

function createErr(log, message, status) {
  const err = {
    log,
    message: { err: message }
  };
  if (status) err.status = status;
  return err;
}

emojiController.addEmoji = function (req, res, next) {
  // console.log(req.body);
  Emoji.create({
    name: req.body.name,
    code: req.body.code
    })
    .then((data) => {
      res.locals.emoji = data;
      return next();
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


module.exports = emojiController;