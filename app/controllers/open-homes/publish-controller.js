const OpenHome = require('../../models/open-home');
const Listing = require('../../models/listing');
const User = require('../../models/user');

class RequestController {
  static async create(req, res, next) {
    let owner = await User.findOne({ googleId: req.user.googleId });
    let listing = await Listing.findOne({ 'StandardFields.ListingId': req.body.MLSId });

    console.log(req.body, owner, listing)

    if(!owner || !listing) {
      return res.json({success: false});
    }

    OpenHome.create({
      listing,
      owner
    });

    res.json({ success: true });
  }
}

module.exports = RequestController;
