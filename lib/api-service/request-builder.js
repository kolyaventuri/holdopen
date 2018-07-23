const querystring = require('querystring');

const buildGet = (opts, params) => {
  let query = querystring.stringify(params);
  opts.uri += `?${query}`;

  return opts;
};

const buildPost = (opts, body) => {
  opts.method = 'POST';
  opts.body = body;

  return opts;
};

const buildFunctions = {
  'GET':  buildGet,
  'POST': buildPost
};

const craft = (method, opts, params) => {
  return buildFunctions[method](opts, params);
};

const buildBasic = (url, headers) => {
  let opts = {
    uri: url,
    headers,
    json: true
  };

  return opts;
};

class RequestBuilder {

  constructor(url, headers) {
    this.BASE_URL = url;
    this.headers = headers;
  }

  build(url, params, method) {
    method = method || 'GET';

    let _url = `${this.BASE_URL}${url}`;

    let basic = buildBasic(_url, this.headers);

    return craft(method, basic, params);
  }

  static register(url, headers) {
    return new this(url, headers);
  }
}

module.exports = RequestBuilder;
