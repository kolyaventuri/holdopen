class DashboardController {
  static index(req, res, next) {
    res.render('dashboard/approval/index', { user: req.user, title: 'Pending Open Home Approvals' } );
  }
}

module.exports = DashboardController;
