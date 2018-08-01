const OpenHome = require('../../models/open-home');
const User = require('../../models/user');
const Bid = require('../../models/bid');

class BidController {
  static async index(req, res, next) {
    let owner = await User.findOne({ googleId: req.user.googleId });

    let _homes = await OpenHome.find({ owner }).populate(['listing', 'bids']);

    for(let i = 0; i < _homes.length; i++) {
      _homes[i].bids = await Bid.find({ openHome: _homes[i] }).populate('bidder');

      _homes[i].bids = _homes[i].bids.map(bid => {
        return {
          id: bid._id,
          bidder: bid.bidder
        }
      });
    }

    let homes = _homes.map(home => {
      home.listing = home.listing.serialize();

      return home;
    });


    res.send({
      results: homes
    });
  }
}

module.exports = BidController;
