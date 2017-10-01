#!/usr/bin/env node

var program = require('commander');

program
  .version('0.1.0')
  .command('init', 'Initialize your CRA server')
  .command('build', 'Build both client and server')
  .command('clean', 'Clean build result')
  .parse(process.argv);
