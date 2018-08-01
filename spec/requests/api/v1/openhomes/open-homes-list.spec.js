const Listing = require('../../../../../app/models/listing');
const User = require('../../../../../app/models/user');
const OpenHome = require('../../../../../app/models/open-home');
const MockHome = require('../../../../helpers/mock/home');

describe('A GET request to /api/v1/openhomes', () => {
  let firstOpenHome = null;

  beforeEach(async () => {
    let listing = await Listing.create(MockHome.random());
    let owner = await User.create(require('../../../user/login/mock/profile'));

    this.openHomes = [];
    for(let i = 0; i < 30; i++) {
      await OpenHome.create({ listing, owner, startTime: new Date(), endTime: new Date() });
    }

  });


  describe('with no pagination parameter', () => {
    it('returns the first 10 homes in the database', (done) => {
      chai.request(app)
        .get('/api/v1/openhomes')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.an('object');

          let body = res.body;

          let results = body.results;
          expect(results).to.be.an('array').that.has.lengthOf(10);

          expect(results[0]).to.be.an('object');
          expect(results[0]).to.have.property('listing');
          expect(results[0].listing).to.not.have.property('StandardFields');
          expect(results[0].listing).to.have.property('ListPrice');
          expect(results[0]).to.have.property('startTime')
          expect(results[0]).to.have.property('endTime');

          expect(results[0]).to.have.property('owner');
          expect(results[0].owner).to.have.property('displayName');

          firstOpenHome = results[0];

          done();
        });
    });
  });

  describe('with a pagination parameter', () => {
    it('returns the next 10 homes in the database', (done) => {
      chai.request(app)
        .get('/api/v1/openhomes?page=2')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.an('object');

          let body = res.body;

          let results = body.results;
          expect(results).to.be.an('array').that.has.lengthOf(10);

          expect(results[0]).to.be.an('object');
          expect(results[0]).to.have.property('listing');
          expect(results[0].listing).to.not.have.property('StandardFields');
          expect(results[0].listing).to.have.property('ListPrice');
          expect(results[0]).to.have.property('startTime');
          expect(results[0]).to.have.property('endTime');

          expect(results[0]).to.have.property('owner');
          expect(results[0].owner).to.have.property('displayName');

          expect(results[0]).to.not.eql(firstOpenHome);

          done();
        });
    });
  })
});
