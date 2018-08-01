const OpenHome = require('../../models/open-home');
const User = require('../../models/user');
const Bid = require('../../models/bid');

class BidController {
  static async create(req, res, next) {
    let bidder = await User.findOne({ googleId: req.user.googleId });
    let openHome = await OpenHome.findOne({ _id: req.body.id });

    if(!bidder || !openHome) {
      return res.json({success: false});
    }

    Bid.create({
      openHome,
      bidder
    });

    res.json({ success: true });
  }
}

module.exports = BidController;
