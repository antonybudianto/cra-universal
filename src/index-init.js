#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const src = path.resolve(__dirname, '..', 'templates', 'server');
const dest = path.resolve(process.cwd(), 'server');

try {
  fs.copySync(src, dest);
  console.log(`
  ****************************************
  * CRA server initialized at ${chalk.bgBlue(dest)}!

  * ${chalk.underline('Next steps:')}
  * - Change your 'render' method into 'hydrate'
  * - npm start
  * - cd ./server
  * - npm install
  * - npm start
  ****************************************
  `);
} catch (err) {
  console.error(err);
}
