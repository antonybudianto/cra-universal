#!/usr/bin/env node

var program = require('commander');

program
  .version('0.1.0')
  .command('init', 'Initialize your CRA server')
  .parse(process.argv);
