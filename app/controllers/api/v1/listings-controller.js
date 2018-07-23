const Listing = require('../../../models/listing');

let LIMIT = 10;

class ListingsController {
  static index(req, res, next) {
    let skip = (req.query.page - 1) * LIMIT;

    Listing.find(null, null, { skip, limit: LIMIT }).then((results) => {
      res.json(results);
    }).catch(err => {
      console.error(err);
      res.send().status(500);
    });

  }
}

module.exports = ListingsController;
