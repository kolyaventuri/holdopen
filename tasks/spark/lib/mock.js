const mongoose = require('../../../db/mongo');
const Listing = require('../../../app/models/listing');
const MockHome = require('../../../spec/helpers/mock/home');

let total = 0;
let totalPulled = 0;

const start = async (number, page) => {
  try {
    await mongoose.dropCollection('listings');
  } catch(err) {
    // the collection doesn't exist, we're good to go
  }

  return await mock(number);
}

const mock = async (number) => {
  for(let i = 0; i < number; i++) {
    let listingModel = new Listing(MockHome.random());
    total++;
    await listingModel.save();
  }

  return stop();
};

const stop = () => {
  console.log(`[${total} / ${total}] (100%)`);
  console.log('All done!');
  process.exit(0);
};

module.exports = start;
