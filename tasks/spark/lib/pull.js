const mongoose = require('../../../db/mongo');
const Listing = require('../../../app/models/Listing');

const spark = require('../../../app/services/spark');

let total = 0;

const options = {
  _limit: 25,
  _pagination: 1,
  _expand: 'PrimaryPhoto'
};

const pull = async (number, page) => {
  page = page || 1;
  let opts = Object.assign(options, { _page: page })
  let listings = await spark.makeRequest('/listings', opts);

  console.log(Object.keys(listings.D));

  for(let listing of listings.D.Results) {
    total += 1;
  }
};

module.exports = pull;
