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

  it('I can approve a bid', (done) => {
    chai.request(app)
      .put('/api/v1/openhomes/bid')
      .send({
        id: this.bidA,
        approved: true
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('success').that.is.true;

        Bid.findOne({ _id: this.bidA._id }).then(bid => {
          expect(bid.approved).to.be.true;

          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
