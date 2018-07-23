const makeRequest = require('./make-request');
const buildFilter = require('./build-filter');

let options = {
  _limit: 25,
  _pagination: 1,
  _expand: 'PrimaryPhoto'
};

const search = async (params) => {
  params = params || {};
  let filter = buildFilter(params);

  let opts = Object.assign(options, {
    _filter: filter,
    _page: params.page || 1
  });

  let results = await makeRequest('/listings', opts);

  if(!results.D) throw new Error('An error occured during search.');

  return results.D;
}

module.exports = search;
