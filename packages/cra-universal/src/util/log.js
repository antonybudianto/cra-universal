const chalk = require('chalk');

function log(...args) {
  console.log(chalk.bgCyan(' crau > '), chalk.cyan(...args));
}

module.exports = {
  log
};
