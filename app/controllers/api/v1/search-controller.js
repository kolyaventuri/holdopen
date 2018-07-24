class SearchController {
  static index(req, res, next) {
    let query = req.query.q;
    if(!query) {
      return res.status(400).json({ error: 'No query provided.'});
    }
    res.send();
  }
}

module.exports = SearchController;
