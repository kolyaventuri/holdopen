process.env.NODE_ENV = 'test';

global.chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

global.pry = require('pryjs');

global.app = require('../../app');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/holdopen_test', { useNewUrlParser: true } );

global.db = mongoose.connection;

before((done) => {
  db.once('open', async () => {
    await db.dropDatabase();
    done();
  });
});

afterEach(async () => {
  await db.dropDatabase();
});
