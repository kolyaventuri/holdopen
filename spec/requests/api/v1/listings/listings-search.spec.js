const Listing = require('../../../../../app/models/listing');
const MockHome = require('../../../../helpers/mock/home');

describe('A GET request to /api/v1/listings', () => {
  let firstHome = null;

  before(() => {
    this.listings = [];
    for(let i = 0; i < 30; i++) {
      // It confounds me why this would fix an issue where all array
      // values became the same. My buest guess is some sort of
      // "under the hood" pointer issue. I just know it works.
      this.listings.push(() => MockHome.random());
    }

  });

  beforeEach(async () => {
    for(let listing of this.listings) {
      await Listing.create(listing.call());
    }
  });

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
    it('returns the next 10 homes in the database', (done) => {
      chai.request(app)
        .get('/api/v1/listings?page=2')
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

          expect(results[0]).to.not.eql(firstHome);

          done();
        });
    });
  })
});
