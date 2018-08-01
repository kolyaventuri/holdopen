const express = require('express');
const router = express.Router();
const BiddersController = require('../../../../../../app/controllers/open-homes/bidders-controller');

router.get('/', BiddersController.index);

module.exports = router;
