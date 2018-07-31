const express = require('express');
const router = express.Router();

const SearchController = require('../../../../app/controllers/api/v1/search-controller');

const loggedIn = require('../../../../app/helpers/logged-in/hard-fail');

router.use('*', loggedIn);

router.get('/', SearchController.index);

module.exports = router;
