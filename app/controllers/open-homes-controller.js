const OpenHome = require('../models/open-home');

const LIMIT = 10;

class OpenHomesController {
  static async index(req, res, next) {
    let page = req.query.page || 1;
    let skip = (page - 1) * LIMIT;
    let openHomes = await OpenHome.find(null, { listing: 1, startTime: 1, endTime: 1 }, { skip, limit: LIMIT })
        .populate(['listing', 'owner']);

    openHomes = openHomes.map(openHome => {
      if(!openHome.listing) return;
      openHome.listing = openHome.listing.serialize();

      openHome.owner = {
        displayName: openHome.owner._doc.displayName
      };


      return openHome;
    });

    let results = {
      results: openHomes,
      pagination: {
        currentPage: page
      }
    };

    res.json(results);
  }
}

module.exports = OpenHomesController;
