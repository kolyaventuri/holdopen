const express = require('express');
const router = express.Router();

const OpenHomesPublishController = require('../../../../../app/controllers/open-homes/publish-controller');
const loggedIn = require('../../../../../app/helpers/logged-in/hard-fail');

router.use('*', loggedIn);

router.post('/', OpenHomesPublishController.create);

module.exports = router;
