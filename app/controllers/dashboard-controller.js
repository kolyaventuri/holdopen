class DashboardController {
  static index(req, res, next) {
    res.send('Hi!');
  }
}

module.exports = DashboardController;
