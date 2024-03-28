import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { inflateSync } from 'zlib';

/**
 * Initialize a git directory
 * @returns {void}
 */
export function createGitDirectory() {
  const gitDirPath = join(process.cwd(), '.git');

  mkdirSync(gitDirPath, { recursive: true });
  mkdirSync(join(gitDirPath, 'objects'), { recursive: true });
  mkdirSync(join(gitDirPath, 'refs'), { recursive: true });

  writeFileSync(join(gitDirPath, 'HEAD'), 'ref: refs/heads/main\n');
  console.log('Initialized git directory');
}

/**
 * Print the contents of a file
 * @param {string} objectHash - The hash of the object to print
 * @returns {void}
 */
export function catFile(objectHash) {
  const directory = getObjectDirectory(objectHash);
  const fileName = getObjectFileName(objectHash);
  const compressedFilePath = join(process.cwd(), '.git', 'objects', directory, fileName);
  const compressedData = readFileSync(compressedFilePath);
  const decompressedData = inflateSync(compressedData);
  const data = decompressedData.toString();
  const fileContent = data.split('\0')[1];
  process.stdout.write(fileContent);
}

export function getObjectDirectory(objectHash) {
  return objectHash.slice(0, 2);
}

export function getObjectFileName(objectHash) {
  return objectHash.slice(2);
}
