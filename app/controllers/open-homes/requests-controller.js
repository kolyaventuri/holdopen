const OpenHome = require('../../models/open-home');
const User = require('../../models/user');

class RequestController {
  static async index(req, res, next) {
    let user = await User.findOne({ googleId: req.user.googleId });


    let openHomes = await OpenHome.find({ owner: user._id }).populate('listing');

    let result = { results: [] };

    for(let home of openHomes) {
      result.results.push(home.listing.serialize());
    }

    res.json(result);
  }
}

module.exports = RequestController;
