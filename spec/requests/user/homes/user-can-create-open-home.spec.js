const Listing = require('../../../../app/models/listing');
const OpenHome = require('../../../../app/models/open-home');
const User = require('../../../../app/models/user');

const MockHome = require('../../../helpers/mock/home');

xdescribe('As an authenticated user', () => {
  beforeEach(async () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('../login/mock/profile');

    this.owner = await User.create(app.request.user);

    this.propertyA = await Listing.create(MockHome.random());
    this.propertyB = await Listing.create(MockHome.random());
  });

  afterEach(() => {
    this.sandbox.restore();
  });


  it('I can create an open home', (done) => {
    chai.request(app)
      .post('/api/v1/openhomes/publish')
      .send({
        MLSId: this.propertyA.serialize().MLSId
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');

        expect(res.body).to.have.property('success').that.is.true;

        let result = OpenHome.findOne({ listing: this.propertyA._id });

        db.collection('openhomes').findOne({ listing: this.propertyA._id })
          .then(data => {
            expect(data).to.not.be.null;
            expect(data).to.be.an('object');
            expect(data).to.have.property('owner').that.eqls(this.owner._id);

            done();
          })
          .catch(err => {
            done(err);
          });

      });
  });
});
