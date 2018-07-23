const RequestBuilder = require('./request-builder');

class APIService {
  constructor(url, headers) {
    this.builder = new RequestBuilder(url, headers);
  }

  async get(url, parameters) {
    let opts = this.builder.build(url, parameters);

    return await request(opts);
  }
}

module.exports = APIService;
