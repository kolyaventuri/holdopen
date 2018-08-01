const express = require('express');
const router = express.Router();
const BidController = require('../../../../../../app/controllers/open-homes/bid-controller');

router.get('/', BidController.index);

module.exports = router;
