const { createGitDirectory } = require('./commands.js');

const command = process.argv[2];

switch (command) {
  case 'init':
    createGitDirectory();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
