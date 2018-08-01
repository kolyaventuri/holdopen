class MarketplaceController {
  static index(req, res, next) {
    res.render('marketplace/index', { user: req.user, title: 'HoldOpen Marketplace' } );
  }
}

module.exports = MarketplaceController;
