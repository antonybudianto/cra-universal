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

cleanBuild().then(() => {
  const config = require('../config/webpack.config');
  const ins = webpack(config);
  ins.watch(
    {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: undefined
    },
    (err, stats) => {
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
    }
  );
});
