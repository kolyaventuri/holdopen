var express = require('express');
var router = express.Router();

const WelcomeController = require('../app/controllers/welcome-controller');

/* GET home page. */
router.get('/', WelcomeController.index);

router.use('/dashboard', require('./dashboard'));

module.exports = router;
