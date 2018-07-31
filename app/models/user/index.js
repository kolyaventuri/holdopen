const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  listedHomes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OpenHome'
  }]
}, { strict : false });

module.exports = mongoose.model('User', userSchema);
