const MarketplaceController = require('../app/controllers/marketplace-controller');
const loggedIn = require('../app/helpers/logged-in');

var express = require('express');
var router = express.Router();

router.get('/', loggedIn, MarketplaceController.index);

module.exports = router;
