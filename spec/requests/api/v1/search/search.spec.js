describe('A GET request to /api/v1/listings', () => {
  let firstHome = null;

  describe('with a zip code parameter', () => {
    it('returns the MLS search results for that zip code', () => {
      chai.request(app)
        .get('/api/v1/search?q=87114')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.an('object');

          let body = res.body;

          let results = body.results;

          expect(results).to.be.an('array');

          expect(results[0]).to.be.an('object');

          firstHome = results[0];
        });
    });
  });

  describe('with a different zip code', () => {
    it('should return different homes', () => {
      chai.request(app)
        .get('/api/v1/search?q=87120')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          let home = res.body.results[0];

          expect(home).to.not.eql(firstHome);
        });
    });
  });
});
