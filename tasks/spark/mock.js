const args = require('gar')(process.argv.slice(2));
const readline = require('readline');

const color = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  bgWhite: "\x1b[47m"
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let number = args.n || args.number || args.num;

if(args.env) {
  require('dotenv').config();
}

const doRun = () => {
  if(number && !Number.isFinite(number)) {
    console.error(new Error('Provided value must be a number.'));
    process.exit(1);
  }

  console.log('Lets go!');
  console.log(`Mocking ${number} listings.`);

  require('./lib/mock')(number);
};

doRun();
