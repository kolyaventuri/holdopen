const express = require('express');
const router = express.Router();

const loggedIn = require('../../../../../app/helpers/logged-in/hard-fail');

router.use('*', loggedIn);

router.use('/requests', require('./requests'));
router.use('/delete', require('./delete'));

module.exports = router;
