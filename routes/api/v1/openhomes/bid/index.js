const express = require('express');
const router = express.Router();

const OpenHomesBidController = require('../../../../../app/controllers/open-homes/bid-controller');
const loggedIn = require('../../../../../app/helpers/logged-in/hard-fail');

router.use('*', loggedIn);

router.post('/', OpenHomesBidController.create);

module.exports = router;
