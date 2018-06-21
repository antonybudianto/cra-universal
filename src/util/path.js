const path = require('path');

const cwd = process.cwd();

const pcwd = path.resolve(cwd);

function resolveCwd(name) {
  return path.resolve(cwd, name);
}

function resolveDir(name) {
  return path.resolve(__dirname, name);
}

module.exports = {
  resolveCwd,
  resolveDir,
  cwd,
  pcwd
};
