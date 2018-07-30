describe('Accessing the dashboard as an unauthenticated user', () => {
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
