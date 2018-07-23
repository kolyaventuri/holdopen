describe('A GET request to /api/v1/listings', () => {
  let firstHome = null;

  describe('with no pagination parameter', () => {
    it('returns the first 10 homes in the database', (done) => {
      chai.request(app)
        .get('/api/v1/listings')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.an('object');

          let body = res.body;

          let results = body.results;
          expect(results).to.be.an('array').that.has.lengthOf(10);

          expect(results[0]).to.be.an('object');
          expect(results[0]).to.not.have.property('StandardFields');
          expect(results[0]).to.have.property('ListPrice');

          firstHome = results[0];

          done();
        });
    });
  });

  describe('with a pagination parameter', () => {
    it('returns the first 10 homes in the database', (done) => {
      chai.request(app)
        .get('/api/v1/listings?page=2')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.an('object');
          expect(res.body).to.have.lengthOf(10);

          let body = res.body;

          let results = body.results;
          expect(results).to.be.an('array').that.has.lengthOf(10);

          expect(results[0]).to.be.an('object');
          expect(results[0]).to.not.have.property('StandardFields');
          expect(results[0]).to.have.property('ListPrice');

          expect(results[0]).to.not.eql(firstHome);

          done();
        });
    });
  })
});
