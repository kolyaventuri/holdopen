const RequestBuilder = require('../../../lib/api-service/request-builder');

describe('Request Builder', () => {
  it('builds request object', () => {
    let builder = new RequestBuilder('AURL', {h: 1});

    let result = builder.build('/end', {q:2});

    expect(result).to.eql({
      uri: 'AURL/end?q=2',
      headers: {
        h: 1
      },
      json: true
    });
  });
});
