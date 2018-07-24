const Spark = require('../../../services/spark');
const QueryParser = require('../../../services/spark/lib/query-parser');

class SearchController {
  static async index(req, res, next) {
    let query = req.query.q;
    if(!query) {
      return res.status(400).json({ error: 'No query provided.'});
    }

    let formattedQuery = QueryParser.parse(query);

    let results = await Spark.search(formattedQuery);

    res.json(results);
  }
}

module.exports = SearchController;
