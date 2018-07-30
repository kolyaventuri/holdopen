const loggedIn = require('../../../../app/helpers/logged-in');

const helpers = { loggedIn };

describe('Accessing an authenticated endpoint', () => {
  before(() => {
  });

  after(() => {
    this.loggedIn.restore();
  });

  it('shows me my name', (done) => {
    chai.request(app)
      .get('/dashboard')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        let $ = cheerio.load(res.body);

        expect($('body')).to.have.text('Welcome, John Doe')
      });
  });
});
