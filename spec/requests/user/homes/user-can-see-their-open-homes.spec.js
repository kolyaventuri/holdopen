const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');

const MockHome = require('../../../helpers/mock/home');

describe('As an authenticated user', () => {
  before(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('../login/mock/profile');

    let owner = await User.create(app.request.user);

    this.propertyA = await Listing.create(MockHome.random());
    this.propertyB = await Listing.create(MockHome.random());

    await OpenHome.create({
      listing: this.propertyA,
      owner
    });
  });

  after(() => {
    this.sandbox.restore();
  });

  it('I can see open homes I have saved', (done) => {
    chai.request(app)
      .get('/api/v1/openhomes/my')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        execpt(res.body).to.be.an('object');

        let body = res.body;

        let result = body.results;

        expect(results).to.be.an('array').with.lengthOf(1);

        expect(results[0]).to.have.property('MLSId').that.eqls(this.propertyA.ListingId);
        for(let result of results) {
          expect(result.MLSId).to.not.eql(this.propertyB.ListingId);
        }
        done();
      });
  });
});
