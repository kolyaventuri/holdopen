const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');
const Bid = require('../../../../app/models/bid');

const MockHome = require('../../../helpers/mock/home');

describe('As an authenticated user', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = Object.assign({ googleId: '222' }, require('../login/mock/profile'));

    this.bidder = await User.create(app.request.user);
    let owner = await User.create(require('../login/mock/profile'));

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

  it('I can bid on listed open homes', (done) => {
    chai.request(app)
      .post('/api/v1/openhomes/bid')
      .send({ id: this.openhome._id })
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('success')
        Bid.findOne({ openHome: this.openhome._id })
          .then(result => {
            expect(result).to.not.be.null;
            expect(result).to.be.an('object');
            expect(result).to.have.property('bidder').that.eqls(this.bidder._id);
            done();
          }).catch(err => {
            done(err);
          });
      });
  });
});
