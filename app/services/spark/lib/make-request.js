const APIService = require('../../../../lib/api-service');
const TokenGenerator = require('./token-generator');
const SignatureGenerator = require('./signature-generator');

const credentials = [process.env.SPARK_KEY, process.env.SPARK_SECRET];

const tokenGenerator = new TokenGenerator(...credentials);
const signatureGenerator = new SignatureGenerator(...credentials);

const BASE_URL = "https://sparkapi.com/v1";

const headers = {
  'User-Agent': 'Venturi Group Albuquerque',
  'X-SparkApi-User-Agent': 'Venturi Group Albuquerque'
};

const API = new APIService(BASE_URL, headers);

const makeRequest = async (endpoint, opts) => {
  opts = opts || {};

  const token = await tokenGenerator.getToken();
  const signature = signatureGenerator.generate(endpoint, opts, token.token);

  opts['ApiSig']    = signature;
  opts['AuthToken'] = token.token;
  return await API.get(endpoint, opts);
};

module.exports = makeRequest;
