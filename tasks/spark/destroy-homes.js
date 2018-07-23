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

let force = !!args.f || !!args.force;

if(args.env) {
  require('dotenv').config();
}

const doRun = () => {
  require('./lib/destroy')();
};

if(force) {
  doRun();
} else {
  console.log('This action will destroy the database.');
  console.log(`${color.bgWhite}${color.red}This is a destructive action.${color.reset}`);
  rl.question(`Are you sure you want to proceed? [y/N]: `, (answer) => {
    answer = answer.toLowerCase();

    if(answer !== 'y' && answer !== 'yes') {
      process.exit(0);
      return;
    }

    doRun();
  });
}
