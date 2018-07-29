const passport = require('passport');

describe('Accessing an authenticated endpoint', () => {
  before(() => {
    var strategy = passport._strategies['google'];

    strategy._profile = require('./mock/profile');
  });

  it('shows me my name', (done) => {
    chai.request(app)
      .get('/auth/google')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        let $ = cheerio.load(res.body);

        expect($('body')).to.have.text('Welcome, John Doe');
        done();
      });
  });
});
