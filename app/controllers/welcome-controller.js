class WelcomeController {
  static index(req, res, next) {
    res.render('index', { title: 'HoldOpen' });
  }
}

module.exports = WelcomeController;
