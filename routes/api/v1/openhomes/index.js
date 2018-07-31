const express = require('express');
const router = express.Router();

router.use('/my', require('./my'));
router.use('/publish', require('./publish'));

module.exports = router;
