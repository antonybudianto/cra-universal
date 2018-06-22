#!/usr/bin/env node

var inquirer = require('inquirer');
var rimraf = require('rimraf');
var chalk = require('chalk');

const cwd = process.cwd();
const paths = ['build', 'dist', 'server-build'];

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
      paths.forEach(path => {
        rimraf(`${cwd}/${path}`, err => {
          console.log(`${chalk.bgWhite(path)} cleaned!`);
        });
      });
    }
  });
