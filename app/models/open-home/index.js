const mongoose = require('mongoose');

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

  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('OpenHome', openHomeSchema);
