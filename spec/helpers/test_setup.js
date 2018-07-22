process.env.NODE_ENV = 'test';

global.chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

global.app = require('../../app');
