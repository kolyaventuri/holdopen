
const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');

const MockHome = require('../../../helpers/mock/home');

describe('As an authenticated user', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = {};

    await User.create(app.request.user);
    this.owner = await User.create(require('../login/mock/profile'));

    this.propertyA = await Listing.create(MockHome.random());
    this.propertyB = await Listing.create(MockHome.random());

    this.openhome = await OpenHome.create({
      listing: this.propertyA,
      owner: this.owner
    });

  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('I cannot delete an open home I haven\'t listed', (done) => {
    chai.request(app)
      .delete('/api/v1/openhomes/my/delete')
      .send({ MLSId: this.propertyA.StandardFields.ListingId })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('success').that.is.false;

        let result = OpenHome.findOne({ listing: this.propertyA._id });

        result.then((data) => {

          expect(data).to.not.be.null;
          expect(data).to.be.an('object');
          expect(data).to.have.property('owner').that.eqls(this.owner._id);

          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
