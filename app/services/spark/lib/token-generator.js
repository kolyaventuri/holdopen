const request = require('request-promise');
const crypto = require('crypto');

const APIService = require('../../../../lib/api-service');

const HEADERS = {
  'User-Agent': 'Venturi Group Albuquerque',
  'X-SparkApi-User-Agent': 'Venturi Group Albuquerque'
};

const API = new APIService('https://sparkapi.com/v1', HEADERS);

class TokenGenerator {
  constructor(key, secret) {
    this.key = key;
    this.secret = secret;

    this.API_SIG = crypto.createHash('md5').update(secret + "ApiKey" + key).digest("hex");
  }

  async getToken() {
    let result = await API.post('/session', { ApiKey: this.key, ApiSig: this.API_SIG });

    if(!data['D'].Success) {
      throw new Error('Something went wrong authorizing application.');
    }

    return data;
  }
}

module.exports = TokenGenerator;
