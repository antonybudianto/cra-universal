#!/usr/bin/env node

var inquirer = require('inquirer');
var del = require('del');
const { log } = require('../util/log');

const paths = ['build', 'dist', 'server-build'];
const yesOption = process.argv.slice(2).indexOf('--yes') >= 0;

function clean() {
  del(paths).then(() => {
    log('Build clean done.');
  });
}

if (yesOption) {
  clean();
} else {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Are you sure to clean the build result?',
        name: 'ok'
      }
    ])
    .then(function(answers) {
      if (answers.ok) {
        clean();
      }
    });
}
