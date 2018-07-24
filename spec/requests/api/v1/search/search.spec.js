describe('A GET request to /api/v1/search', () => {
  let firstHome = null;

  describe('with no query', () => {
    it('returns an error', (done) => {
      chai.request(app)
        .get('/api/v1/search')
        .end((err, res) => {
          expect(res).to.have.status(400);

          let body = res.body;

          expect(body.error).to.not.be.null.and.eql('No query provided.');
          done();
        });
    });
  });

  describe('with a zip code parameter', () => {
    it('returns the MLS search results for that zip code', (done) => {
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
          done();
        });
    });
  });

  describe('with a different zip code', () => {
    it('should return different homes', (done) => {
      chai.request(app)
        .get('/api/v1/search?q=87120')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          let home = res.body.results[0];

          expect(home).to.not.eql(firstHome);
          done();
        });
    });
  });
});
