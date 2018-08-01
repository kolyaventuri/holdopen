const express = require('express');
const router = express.Router();
const OpenHomeDeleteController = require('../../../../../../app/controllers/open-homes/delete-controller');

router.delete('/', OpenHomeDeleteController.destroy);

module.exports = router;
