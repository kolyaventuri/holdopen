const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const openHomeSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  claimee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  bids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
  }],

  startTime: Date,
  endTime: Date
});

openHomeSchema.plugin(deepPopulate);

module.exports = mongoose.model('OpenHome', openHomeSchema);
