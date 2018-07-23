const express = require('express');
const router = express.Router();

router.use('/homes', require('./homes'));

module.exports = router;
