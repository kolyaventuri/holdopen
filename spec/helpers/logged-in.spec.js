const loggedIn = require('../../app/helpers/logged-in');

describe('Logged in', () => {

  let res = { redirect: null };
  let req = { isAuthenticated: null }

  before(() => {
    req.isAuthenticated = sinon.stub(req, 'isAuthenticated');

    req.isAuthenticated.returns(true);

    res.redirect = sinon.spy();
  });

  it('calls next when user is authenticated', () => {
    let next = sinon.spy();

    loggedIn(req, res, next);

    expect(next).to.have.been.called;
  });

  it('forces redirect when user is not authenticated', () => {
    let next = sinon.spy();

    req.isAuthenticated.returns(false);
    loggedIn(req, res, next);

    expect(next).to.not.have.been.called;

    expect(res.redirect).to.have.been.calledWith('/login')

  });
});
