const express = require('express');
const router = express.Router();

const HomesController = require('../../../app/controllers/api/v1/homes-controller');

router.get('/', HomesController.index);

module.exports = router;
