const mongoose = require('../../../db/mongo');
const Listing = require('../../../app/models/Listing');

const spark = require('../../../app/services/spark');

let total = 0;

const start = async (number, page) => {
  try {
    await mongoose.dropCollection('listings');
  } catch(err) {
    // the collection doesn't exist, we're good to go
  }

  return await pull(number, page || 1);
}

const pull = async (number, page) => {
  let listings = await spark.search({ _page: page });

  for(let listing of listings.Results) {
    let listingModel = new Listing(listing);
    listingModel.save().then((listing) => {
      console.log(`${listing.StandardFields.UnparsedFirstLineAddress}. . . `);
    }).catch(err => {
      console.error(err);
    });

    total += 1;

    if(total >= number) return stop();
  }

  return await pull(number, page + 1);
};

const stop = () => {
  console.log('All done!');
  process.exit(0);
};

module.exports = start;
