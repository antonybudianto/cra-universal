process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../config/webpack.config');

const cwd = process.cwd();
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';

function buildClient() {
  console.log(chalk.bgCyan('Building CRA client...'));
  const clientBuildResult = spawnSync(npm, ['run', 'build'], {
    stdio: 'inherit'
  });
  if (clientBuildResult.status !== 0) {
    throw 'Error building CRA client.';
  }
  console.log('Done building CRA client!\n');
}

function buildServer(cb) {
  console.log(chalk.bgCyan('Building CRA server...'));
  const ins = webpack(config);
  ins.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(
      stats.toString({
        modules: false,
        colors: true // Shows colors in the console
      })
    );
    console.log('Done building CRA server!');
    cb();
  });
}

function wireBundle() {
  const srcClient = path.resolve(cwd, 'build');
  const destClient = path.resolve(cwd, 'dist', 'client');
  const srcServer = path.resolve(cwd, 'server-build');
  const destServer = path.resolve(cwd, 'dist', 'server');
  const srcServerPkg = path.resolve(cwd, 'package.json');
  const destServerPkg = path.resolve(cwd, 'dist', 'package.json');

  try {
    fs.copySync(srcClient, destClient);
    fs.copySync(srcServer, destServer);
    fs.copySync(srcServerPkg, destServerPkg);
    console.log(`
  CRA Universal build is done at folder:
   ${cwd + chalk.bgWhite('/dist')}
   /dist
    - /client -> Your CRA client build
    - /server -> Your CRA server build
      - bundle.js -> This is your main bundle, please bootup server using this file
      - *.chunk.js -> Other chunk(s) files if you use code splitting
    - package.json -> Your production dependencies

   - Now you can upload ${chalk.bgGreen('dist')} into your hosting server
   - After that, you can run ${chalk.bgGreen(
     'npm install --production'
   )} inside ${chalk.bgGreen('dist/')}
   - Finally you can bootup your server using your favorite Node process manager.`);
  } catch (err) {
    console.error(err);
  }
}

buildClient();
buildServer(() => {
  wireBundle();
});
