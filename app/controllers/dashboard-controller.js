class DashboardController {
  static index(req, res, next) {
    console.log(req.user);
    res.render('dashboard/index', { user: req.user } );
  }
}

module.exports = DashboardController;
