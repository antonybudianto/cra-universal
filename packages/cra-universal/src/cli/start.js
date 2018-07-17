process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const del = require('del');
const { log } = require('../util/log');

function cleanBuild() {
  log('Cleaning build...');
  return del(['server-build']).then(() => {
    log('Build clean done.');
  });
}

module.exports = argv => {
  if (argv.both) {
    log('Running both CRA client and server...');
    const mv = require('multiview')({
      efficient: true
    });
    mv.spawn('npx', ['cra-universal', 'start']);
    mv.spawn('npx', ['react-scripts', 'start']);
    return;
  }
  cleanBuild().then(() => {
    const config = require('../config/webpack.config');
    const ins = webpack(config);
    ins.watch(config.watchOptions, (err, stats) => {
      console.clear();
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
    });
  });
};
