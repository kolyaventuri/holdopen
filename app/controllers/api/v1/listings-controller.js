const Listing = require('../../../models/listing');

let LIMIT = 10;

class ListingsController {
  static index(req, res, next) {
    let page = req.query.page || 1;
    let skip = (page - 1) * LIMIT;

    Listing.find(null, null, { skip, limit: LIMIT }).then((listings) => {
      let results = {
        results: listings,
        pagination: {
          currentPage: page
        }
      };
      
      res.json(results);
    }).catch(err => {
      res.send().status(500);
    });

  }
}

module.exports = ListingsController;
