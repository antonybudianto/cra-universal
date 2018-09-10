#!/usr/bin/env node

require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
});

var yargs = require('yargs');

yargs
  .command(
    'init',
    'Initialize standalone CRA server',
    () => {},
    argv => {
      require('./cli/init');
    }
  )
  .command(
    'start',
    'Start CRA server',
    c => {
      return c.options({
        both: {
          alias: 'b',
          description: 'Start both CRA client and server (beta)'
        }
      });
    },
    argv => {
      require('./cli/start')(argv);
    }
  )
  .command(
    'build',
    'Build CRA server',
    () => {},
    argv => {
      require('./cli/build');
    }
  )
  .command(
    'clean',
    'Clean build result',
    c => {
      return c.options({
        yes: {
          describe: 'Clean without prompt'
        }
      });
    },
    argv => {
      require('./cli/clean');
    }
  )
  .demandCommand(1, 'Please choose your command')
  .epilog('CRA Universal CLI')
  .help()
  .strict().argv;
