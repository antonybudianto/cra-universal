#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');

const cwd = process.cwd();

console.log(chalk.bgCyan('Building CRA client...'));
const clientBuildResult = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit'
});
if (clientBuildResult.status !== 0) {
  throw 'Error building CRA client.'
}
console.log('Done building CRA client!\n');

console.log(chalk.bgCyan('Building CRA server...'));
const serverBuildResult = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  cwd: path.resolve(cwd, 'server')
});
if (serverBuildResult.status !== 0) {
  throw 'Error building CRA server.'
}
console.log('Done building CRA server!');

const srcClient = path.resolve(cwd, 'build');
const destClient = path.resolve(cwd, 'dist', 'build', 'client');
const srcServer = path.resolve(cwd, 'server', 'build');
const destServer = path.resolve(cwd, 'dist', 'build');
const srcServerPkg = path.resolve(cwd, 'server', 'package.json');
const destServerPkg = path.resolve(cwd, 'dist', 'package.json');

try {
  fs.copySync(srcClient, destClient);
  fs.copySync(srcServer, destServer);
  fs.copySync(srcServerPkg, destServerPkg);
  console.log(`
  CRA Universal build is done at folder:
   ${cwd + chalk.bgWhite('/dist')}
   /dist
    - /build -> Your client and server build
       - /client -> Your regular CRA client build
       - bundle.js -> This is your main bundle, you bootup server using this file
       - *.chunk.js -> Other chunk(s) files if you use code splitting
    - package.json -> Your production dependencies

   - Now you can upload ${chalk.bgGreen('dist')} into your hosting server
   - After that, you can run ${chalk.bgGreen('npm install --production')} inside ${chalk.bgGreen('dist/')}
   - Finally you can bootup your server using your favorite Node process manager.`);
} catch (err) {
  console.error(err);
}
