const APIService = require('../../../lib/api-service');

describe('APIService', () => {
  it('makes a get request', async () => {
    let API = new APIService('https://jsonplaceholder.typicode.com', {});

    let result = await API.get('/posts/1');

    expect(result).to.be.an('object');
  });
});
