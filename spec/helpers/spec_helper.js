const chai = require('chai');

chai.use(require('chai-cheerio'));

global.expect = chai.expect;
global.cheerio = require('cheerio');
