const OpenHome = require('../../models/open-home');
const User = require('../../models/user');

class RequestController {
  static index(req, res, next) {
    res.json({});
  }
}

module.exports = RequestController;
