const Spark = require('../../../services/spark');
const QueryParser = require('../../../services/spark/lib/query-parser');
const Listing = require('../../../models/listing');
 
class SearchController {
  static async index(req, res, next) {
    let query = req.query.q;
    if(!query) {
      return res.status(400).json({ error: 'No query provided.'});
    }

    let formattedQuery = QueryParser.parse(query);

    let searchResults = await Spark.search(formattedQuery);

    let listings = searchResults.Results.map(listing => {
      return new Listing(listing).serialize();
    });

    let results = {
      results: listings,
      pagination: searchResults.Pagination
    }
    res.json(results);
  }
}

module.exports = SearchController;
