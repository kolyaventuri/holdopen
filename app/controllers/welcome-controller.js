class WelcomeController {
  static index(req, res, next) {
    res.render('welcome/index', { title: 'HoldOpen', user: req.user });
  }
}

module.exports = WelcomeController;
