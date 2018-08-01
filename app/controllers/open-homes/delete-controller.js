const OpenHome = require('../../models/open-home');
const User = require('../../models/user');
const Listing = require('../../models/listing');

class RequestController {
  static async destroy(req, res, next) {
    let user = await User.findOne({ googleId: req.user.googleId });

    let listing = await Listing.findOne({ 'StandardFields.ListingId': req.body.MLSId });

    if(!user || !listing) return res.json({ success: false });

    let openHome = await OpenHome.findOne({ owner: user._id, listing: listing._id });

    if(!openHome) return res.status(400).json({ success: false });

    await openHome.remove();

    res.json({ success: true });
  }
}

module.exports = RequestController;
