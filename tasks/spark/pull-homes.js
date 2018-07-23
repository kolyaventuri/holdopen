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
let force = !!args.f || !!args.force;

if(args.env) {
  require('dotenv').config();
}

const doRun = () => {
  if(number && !Number.isFinite(number)) {
    console.error(new Error('Provided value must be a number.'));
    process.exit(1);
  }

  console.log('Lets go!');
  console.log(`Pulling ${number || 'ALL'} listings.`);

  require('./lib/pull')(number);
};

if(!number && !force) {
  console.log('This action will pull ALL homes from the MLS.');
  console.log(`${color.bgWhite}${color.red}This is a costly action.${color.reset}`);
  console.log('If you meant to pull a specific number, pass the -n flag');
  rl.question(`Are you sure you want to proceed? [y/N]: `, (answer) => {
    answer = answer.toLowerCase();

    if(answer !== 'y' && answer !== 'yes') {
      process.exit(0);
      return;
    }

    doRun();
  });
} else {
  doRun();
}
