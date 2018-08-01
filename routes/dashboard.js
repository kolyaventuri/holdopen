const DashboardController = require('../app/controllers/dashboard-controller');
const DashboardApprovalController = require('../app/controllers/dashboard/approval-controller');
const loggedIn = require('../app/helpers/logged-in');

var express = require('express');
var router = express.Router();

router.get('/', loggedIn, DashboardController.index);
router.get('/approvals', loggedIn, DashboardApprovalController.index);

module.exports = router;
