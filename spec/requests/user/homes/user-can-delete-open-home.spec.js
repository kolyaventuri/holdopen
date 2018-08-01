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

  it('I can delete an open home I have listed', (done) => {
    chai.request(app)
      .delete('/api/v1/openhomes/my/delete')
      .send({ MLSId: this.propertyA.StandardFields.ListingId })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('success').that.is.true;

        let result = OpenHome.findOne({ listing: this.propertyA._id });

        result.then((data) => {
          expect(data).to.be.null;

          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
