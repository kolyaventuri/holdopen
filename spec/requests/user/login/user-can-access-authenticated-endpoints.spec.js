const DashboardController = require('../../../../app/controllers/dashboard-controller');

describe('Accessing an authenticated endpoint', () => {
  before(() => {
    this.req = httpMocks.createRequest({
      isAuthenticated: sinon.stub().returns(true),
      user: require('./mock/profile')
    });

    this.res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
  });


  it('shows me my name', () => {

    DashboardController.index(this.req, this.res);

    let rendered = this.res.render(this.res._getRenderView(), this.res._getRenderData());

    expect(this.res._getRenderData().user).to.be.an('object');
  });
});
