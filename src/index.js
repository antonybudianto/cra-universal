#!/usr/bin/env node

var yargs = require('yargs');

yargs
.command('init', 'Initialize your CRA server', () => {},  (argv) => {
  require('./init');
})
.command('start', 'Start both client and server', () => {},  (argv) => {
  require('./start');
})
.command('build', 'Build both client and server', () => {}, (argv) => {
  require('./build');
})
.command('clean', 'Clean build result', () => {}, (argv) => {
  require('./clean');
})
.demandCommand(1, 'Please choose your command')
.epilog('CRA Universal CLI')
.help()
.strict()
.argv;
