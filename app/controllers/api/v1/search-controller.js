const Spark = require('../../../services/spark');

class SearchController {
  static index(req, res, next) {
    let query = req.query.q;
    if(!query) {
      return res.status(400).json({ error: 'No query provided.'});
    }

    let results = Spark.search({ q });

    res.json(results);
  }
}

module.exports = SearchController;
