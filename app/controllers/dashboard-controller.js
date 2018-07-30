class DashboardController {
  static index(req, res, next) {
    res.render('dashboard/index', { user: req.user } );
  }
}

module.exports = DashboardController;
