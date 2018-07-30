const chai = require('chai');

chai.use(require('chai-cheerio'));
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.cheerio = require('cheerio');
global.sinon = require('sinon');
