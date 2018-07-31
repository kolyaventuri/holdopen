const Listing = require('../../../app/models/listing');

describe('As an authenticated user', () => {
  before(() => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('../login/mock/profile');

    //this.property = await Listing.create();
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

        expect(results[0]).to.have.property('MLSId').that.eqls(this.property.MLSId);
        done();
      });
});
