const path = require('path');

const cwd = process.cwd();

const pcwd = path.resolve(cwd);

function resolveCwd(name) {
  return path.resolve(cwd, name);
}

function resolveDir(...args) {
  return path.resolve(__dirname, ...args);
}

module.exports = {
  resolveCwd,
  resolveDir,
  cwd,
  pcwd
};
