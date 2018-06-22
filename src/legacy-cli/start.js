const { spawn } = require('child_process');
const path = require('path');

const cwd = process.cwd();

spawn('npm', ['start'], {
  stdio: 'inherit'
});

spawn('npm', ['start'], {
  stdio: 'inherit',
  cwd: path.resolve(cwd, 'server')
});
