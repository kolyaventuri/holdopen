const express = require('express');
const router = express.Router();

const OpenHomesController = require('../../../../app/controllers/open-homes-controller');

router.get('/', OpenHomesController.index);

router.use('/my', require('./my'));
router.use('/publish', require('./publish'));
router.use('/bid', require('./bid'));

module.exports = router;
