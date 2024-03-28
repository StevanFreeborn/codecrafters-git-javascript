import { createGitDirectory, catFile } from './commands.js';

const command = process.argv[2];

switch (command) {
  case 'init':
    createGitDirectory();
    break;
  case 'cat-file': {
    const prettyPrintFlag = process.argv[3];
    const objectHash = process.argv[4];

    if (prettyPrintFlag !== '-p') {
      throw new Error(`Expected -p flag, got ${prettyPrintFlag}`);
    }

    if (!objectHash) {
      throw new Error('Expected object hash, got nothing');
    }

    catFile(objectHash);
    break;
  }
  default:
    throw new Error(`Unknown command ${command}`);
}
