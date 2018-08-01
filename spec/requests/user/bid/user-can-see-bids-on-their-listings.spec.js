const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');
const Bid = require('../../../../app/models/bid');

const MockHome = require('../../../helpers/mock/home');

describe('As an authenticated user', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('../login/mock/profile');
    this.owner = await User.create(app.request.user);

    let secondUser = Object.assign({ googleId: '222' }, require('../login/mock/profile'));
    this.bidder = await User.create(secondUser);

    this.propertyA = await Listing.create(MockHome.random());
    this.propertyB = await Listing.create(MockHome.random());


    this.openhome = await OpenHome.create({
      listing: this.propertyA,
      owner: this.owner,
    });

    this.openhome2 = await OpenHome.create({
      listing: this.propertyB,
      owner: this.owner
    });

    this.bidA = await Bid.create({
      openHome: this.openhome,
      bidder: this.bidder
    });

    this.bidB = await Bid.create({
      openHome: this.openhome2,
      bidder: this.bidder
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('I can see what bids have been made on my listings', (done) => {
    chai.request(app)
      .get('/api/v1/openhomes/my/bidders')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('results')
        let results = res.body.results;

        expect(results).to.be.an('array');

        expect(results[0]).to.have.property('listing');
        expect(results[0].listing).to.have.property('MLSId').that.eqls(this.propertyA.StandardFields.ListingId);
        expect(results[1].listing).to.have.property('MLSId').that.eqls(this.propertyB.StandardFields.ListingId);

        expect(results[0]).to.have.property('bids').that.is.an('array');
        expect(results[0].bids[0]).to.have.property('displayName').that.eqls(this.bidder.displayName);

        done();
      });
  });
});
