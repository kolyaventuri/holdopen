describe('A non-authenticated GET request to /api/v1/search', () => {
  it('throws a 404 error', (done) => {
    chai.request(app)
      .get('/api/v1/search?q=87114')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);

        done();
      });
  });
});
