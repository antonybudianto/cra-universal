#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

const { log } = require('../util/log');
const src = path.resolve(__dirname, '../..', 'templates', 'server');
const dest = path.resolve(process.cwd(), 'server');
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';

function installDep() {
  log('Adding required dependencies...');
  const result = spawnSync(npm, ['i', '-S', '@cra-express/core'], {
    stdio: 'inherit'
  });
  if (result.status !== 0) {
    throw 'Error installing dependencies.';
  }
  log('Installation done!\n');
}

try {
  fs.copySync(src, dest);
  log(`CRA server initialized at ${chalk.bgBlue(dest)}!`);
  installDep();
} catch (err) {
  console.error(err);
}
