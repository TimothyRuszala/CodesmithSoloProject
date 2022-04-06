const express = require('express');
const emojiController = require('../controllers/emojiController.js');

const router = express.Router();

router.post('/', emojiController.addEmoji, (req, res) => {
    return res.status(200).send(res.locals.emoji);
});

router.get('/', emojiController.getAllEmojis, (req, res) => {
    return res.json(res.locals.emojis);
});

router.patch('/', emojiController.updateEmoji, (req, res) => {
    return res.json(res.locals.updated);
});

router.delete('/:name', emojiController.deleteEmoji, (req, res) => {
    return res.json(res.locals.deleted);
});

module.exports = router;