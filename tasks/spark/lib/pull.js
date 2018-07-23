const mongoose = require('../../../db/mongo');
const Listing = require('../../../app/models/listing');

const spark = require('../../../app/services/spark');

let total = 0;
let totalPulled = 0;

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

  totalPulled += listings.Results.length;

  if(!number) number = listings.Pagination.TotalRows;

  for(let listing of listings.Results) {
    let listingModel = new Listing(listing);
    listingModel.save().then((listing) => {
      total += 1;
      if(total % 25 == 0) {
        let percentage = ((total / number) * 100).toFixed(2);
        console.log(`[${total} / ${number}] (${percentage}%)`);
      }
      if(total >= number) return stop();
    }).catch(err => {
      console.error(err);
    });
  }

  if(totalPulled < number) return pull(number, page + 1);
};

const stop = () => {
  console.log(`[${total} / ${total}] (100%)`);
  console.log('All done!');
  process.exit(0);
};

module.exports = start;
