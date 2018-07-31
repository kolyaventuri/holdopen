const mongoose = require('mongoose');

let mongoUrl;
if(process.env.NODE_ENV === 'test') {
  console.warn('Connecting to TEST database');
  mongoUrl = 'mongodb://127.0.0.1:27017/holdopen_test';
} else {
  mongoUrl = process.env.MONGO_URL;
}

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Mongoose connected');
});

module.exports = db;
