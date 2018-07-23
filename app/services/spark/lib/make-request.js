const APIService = require('../../../../lib/api-service');
const BASE_URL = "https://sparkapi.com/v1";

const headers = {
  'User-Agent': 'Venturi Group Albuquerque',
  'X-SparkApi-User-Agent': 'Venturi Group Albuquerque'
};

const API = new APIService(BASE_URL, headers);

const makeRequest = (endpoint, opts) => {
  
};

module.exports = makeRequest;
