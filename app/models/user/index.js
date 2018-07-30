const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(null, { strict : false });

module.exports = mongoose.model('User', userSchema);
