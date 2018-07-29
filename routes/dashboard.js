const DashboardController = require('../app/controllers/dashboard-controller');
const loggedIn = require('../app/helpers/logged-in');

var express = require('express');
var router = express.Router();

router.get('/', loggedIn, DashboardController.index);

module.exports = router;
