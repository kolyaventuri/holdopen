const RequestBuilder = require('./request-builder');
const request = require('request-promise');

class APIService {
  constructor(url, headers) {
    this.builder = new RequestBuilder(url, headers);
  }

  async get(url, parameters) {
    let opts = this.builder.build(url, parameters);
    console.log(opts.uri);
    return await request(opts);
  }

  async post(url, body) {
    let opts = this.builder.build(url, body, 'POST');

    return await request(opts);
  }
}

module.exports = APIService;
