const OpenHome = require('../../models/open-home');
const User = require('../../models/user');
const Bid = require('../../models/bid');

class BidController {
  static async index(req, res, next) {
    let bidder = await User.findOne({ googleId: req.user.googleId });

    let bids = await Bid.find({ bidder }).deepPopulate('openHome.listing');

    let resultingBids = bids.map(bid => {
      return {
        id: bid._id,
        listing: bid.openHome.listing.serialize()
      }
    });

    res.json({
      results: resultingBids
    });
  }

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

  static async update(req, res, next) {
    let owner = await User.findOne({ googleId: req.user.googleId });

    let bid = await Bid.findOne({ _id: req.body.id }).deepPopulate('openHome.owner');

    if(!owner || !bid || !bid.openHome.owner.equals(owner)) return res.json({ success: false });

    delete req.body.id;

    if(typeof req.body.approved === 'boolean') bid.approved = !!req.body.approved;

    await bid.save();

    res.json({ success: true });
  }

  static async destroy(req, res, next) {
    let bidder = await User.findOne({ googleId: req.user.googleId });

    let bid = await Bid.findOne({ _id: req.body.id, bidder });

    if(!bidder || !bid) return res.json({ success: false });

    await bid.remove();

    res.json({ success: true });
  }
}

module.exports = BidController;
