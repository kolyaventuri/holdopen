const QueryParser = require('../../../services/spark/lib/query-parser');
const Listing = require('../../../models/listing');

class SearchController {
  static async index(req, res, next) {
    let query = req.query.q;
    if(!query) {
      return res.status(400).json({ error: 'No query provided.'});
    }

    let formattedQuery = QueryParser.parse(query);

    let listings = await Listing.where(formattedQuery);

    let results = listings.map(listing => listing.serialize());

    res.json({results});
  }
}

module.exports = SearchController;
