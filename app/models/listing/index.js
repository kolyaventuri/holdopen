const mongoose = require('mongoose');
const ListingSerializer = require('../../serializers/listing');

const listingSchema = new mongoose.Schema(null, { strict : false });

listingSchema.method('serialize', function() {
  return ListingSerializer.serialize(this);
});

module.exports = mongoose.model('Listing', listingSchema);
