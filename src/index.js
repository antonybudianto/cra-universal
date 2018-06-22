#!/usr/bin/env node

var yargs = require('yargs');

yargs
  .command(
    'start',
    'Start both client and server',
    () => {},
    argv => {
      require('./cli/start');
    }
  )
  .command(
    'build',
    'Build both client and server',
    () => {},
    argv => {
      require('./cli/build');
    }
  )
  .command(
    'clean',
    'Clean build result',
    () => {},
    argv => {
      require('./cli/clean');
    }
  )
  .demandCommand(1, 'Please choose your command')
  .epilog('CRA Universal CLI')
  .help()
  .strict().argv;
