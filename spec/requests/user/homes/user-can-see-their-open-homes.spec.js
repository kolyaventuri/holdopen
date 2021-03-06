const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');

const MockHome = require('../../../helpers/mock/home');

describe('As an authenticated user', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('../login/mock/profile');

    let owner = await User.create(app.request.user);

    this.propertyA = await Listing.create(MockHome.random());
    this.propertyB = await Listing.create(MockHome.random());


    this.openhome = await OpenHome.create({
      listing: this.propertyA,
      owner
    });

  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('I can see open homes I have listed', (done) => {
    chai.request(app)
      .get('/api/v1/openhomes/my/requests')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');

        let body = res.body;

        let results = body.results;

        expect(results).to.be.an('array').with.lengthOf(1);

        expect(results[0]).to.have.property('MLSId').that.eqls(this.propertyA.StandardFields.ListingId);
        for(let result of results) {
          expect(result.MLSId).to.not.eql(this.propertyB.StandardFields.ListingId);
        }
        done();
      });
  });
});
