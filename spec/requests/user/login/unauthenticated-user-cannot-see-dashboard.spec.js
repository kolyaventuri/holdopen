describe('Accessing the dashboard as an unauthenticated user', () => {
  before(() => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(false);
  });

  after(() => {
    this.sandbox.restore();
  });

  it('sends me to the login page', (done) => {
    chai.request(app)
      .get('/dashboard')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.redirect;

        expect(res.req.path).to.eq('/');

        done();
      });
  });
});
