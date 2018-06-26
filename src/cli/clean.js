#!/usr/bin/env node

var inquirer = require('inquirer');
var del = require('del');
var chalk = require('chalk');
const { log } = require('../util/log');

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
      del(paths).then(() => {
        log('Build clean done.');
      });
    }
  });
