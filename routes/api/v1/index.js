const express = require('express');
const router = express.Router();

router.use('/listings', require('./listings'));
router.use('/search', require('./search'));

module.exports = router;
