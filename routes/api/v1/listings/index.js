const express = require('express');
const router = express.Router();

const ListingsController = require('../../../../app/controllers/api/v1/listings-controller');

router.get('/', ListingsController.index);

module.exports = router;
