const crypto = require('crypto');

class SignatureGenerator {
  constructor(secret, key) {
    this.secret = secret;
    this.key = key;
  }

  generateSignature(endpoint, params, token) {
    let signature = '';

    params = params || {};
    let paramKeys = Object.keys(params);
    paramKeys.sort();

    for(let key of paramKeys) {
      if(Array.isArray(params[key])) {
        params[key] = params[key].join(',');
      }
      signature += `${key}${params[key]}`;
    }

    signature = `${this.secret}ApiKey${this.key}ServicePath/v1${endpoint}AuthToken${token}${signature}`;

    let hash = crypto.createHash('md5').update(signature).digest('hex');

    return hash;
  }
}

module.exports = SignatureGenerator;
