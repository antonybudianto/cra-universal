process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const webpack = require('webpack');
const del = require('del');

const config = require('../config/webpack.config');
const { log } = require('../util/log');

const cwd = process.cwd();
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';
const paths = ['build', 'dist', 'server-build'];

function cleanBuild(done) {
  del(paths).then(() => {
    log('Build clean done.');
    done();
  });
}

function buildClient() {
  log('Building CRA client...');
  const clientBuildResult = spawnSync(npm, ['run', 'build'], {
    stdio: 'inherit',
  });
  if (clientBuildResult.status !== 0) {
    throw 'Error building CRA client.';
  }
  log('Done building CRA client!\n');
}

function buildServer(cb) {
  log('Building CRA server...');
  const ins = webpack(config);
  ins.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      throw err;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
      throw info.errors;
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(
      stats.toString({
        modules: false,
        colors: true, // Shows colors in the console
      })
    );
    log('Done building CRA server!');
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
  const srcServerPkgLock = path.resolve(cwd, 'package-lock.json');
  const destServerPkgLock = path.resolve(cwd, 'dist', 'package-lock.json');
  const srcServerYarnLock = path.resolve(cwd, 'yarn.lock');
  const destServerYarnLock = path.resolve(cwd, 'dist', 'yarn.lock');

  fs.copySync(srcClient, destClient);
  fs.copySync(srcServer, destServer);
  fs.copySync(srcServerPkg, destServerPkg);
  if (fs.existsSync(srcServerPkgLock)) {
    fs.copySync(srcServerPkgLock, destServerPkgLock);
  }
  if (fs.existsSync(srcServerYarnLock)) {
    fs.copySync(srcServerYarnLock, destServerYarnLock);
  }
  console.log(`
  CRA Universal build is done at folder:
   ${cwd + chalk.cyan('/dist')}
   /dist
    - /client -> Your CRA client build
    - /server -> Your CRA server build
      - bundle.js -> This is your main bundle, please bootup server using this file
      - *.chunk.js -> Other chunk(s) files if you use code splitting
    - package.json -> Your production dependencies

   1. Now you can upload ${chalk.bgGreen('dist')} into your hosting server
   2. After that, you can run ${chalk.bgGreen(
     'npm install --production'
   )} inside ${chalk.bgGreen('dist/')}
   3. Finally you can boot-up your server using your favorite Node process manager:
      - $ node server/bundle.js
      - $ pm2 start server/bundle.js`);
}

try {
  cleanBuild(() => {
    buildClient();
    buildServer(() => {
      wireBundle();
    });
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
