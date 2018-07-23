const mongoose = require('../../../db/mongo');

module.exports = async () => {
  try {
    await mongoose.dropCollection('listings');
  } catch(err) {
    // the collection doesn't exist, we're good to go
  }

  console.log('The database has been destroyed.');
  process.exit(0);
};
