describe('Accessing the dashboard as an authenticated user', () => {
  
  beforeEach(() => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(app.request, 'isAuthenticated').returns(true);

    app.request.user = require('./mock/profile');
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('shows me my name', (done) => {
    chai.request(app)
      .get('/dashboard')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        let $ = cheerio.load(res.text);

        expect($('body')).to.contain('Welcome, John Doe');

        done();
      });
  });
});
