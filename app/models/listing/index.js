const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(null, { strict : false });

module.exports = mongoose.model('Listing', listingSchema);
