const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  openHome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OpenHome',
    required: true
  },

  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Bid', bidSchema);
