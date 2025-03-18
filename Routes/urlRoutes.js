const express = require('express');
const router = express.Router();
const urlController = require('../Controller/urlController');


// Posts a new URL, assigns it a shorten URL, and stores it, in DB.
router.post('/', urlController.createShortUrl);

module.exports = router;