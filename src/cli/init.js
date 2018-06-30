#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawnSync } = require('child_process');
const hasYarn = require('has-yarn');

const { log } = require('../util/log');
const src = path.resolve(__dirname, '../..', 'templates', 'server');
const dest = path.resolve(process.cwd(), 'server');
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';
const hasYarnFlag = hasYarn(path.resolve(process.cwd()));
const command = hasYarnFlag ? 'yarn' : npm;
const args = hasYarnFlag
  ? ['add', '@cra-express/core@2.2.5']
  : ['i', '-S', '@cra-express/core@2.2.5'];

function installDep() {
  log(
    `Installing required dependencies using ${hasYarnFlag ? 'yarn' : 'npm'}...`
  );
  const result = spawnSync(command, args, {
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
