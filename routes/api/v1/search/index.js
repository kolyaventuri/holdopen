const express = require('express');
const router = express.Router();

const SearchController = require('../../../../app/controllers/api/v1/search-controller');

router.get('/', SearchController.index);

module.exports = router;
