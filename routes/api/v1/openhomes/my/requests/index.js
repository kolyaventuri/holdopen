const express = require('express');
const router = express.Router();
const OpenHomeRequestsController = require('../../../../../../app/controllers/open-homes/requests-controller');

router.get('/', OpenHomeRequestsController.index);

module.exports = router;
