const OpenHome = require('../../models/open-home');
const User = require('../../models/user');

class RequestController {
  static async create(req, res, next) {
    let user = await User.findOne({ googleId: req.user.googleId });

    res.json({});
  }
}

module.exports = RequestController;
