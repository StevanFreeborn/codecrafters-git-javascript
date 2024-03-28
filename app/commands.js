import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function createGitDirectory() {
  mkdirSync(join(__dirname, '.git'), { recursive: true });
  mkdirSync(join(__dirname, '.git', 'objects'), { recursive: true });
  mkdirSync(join(__dirname, '.git', 'refs'), { recursive: true });

  writeFileSync(join(__dirname, '.git', 'HEAD'), 'ref: refs/heads/main\n');
  console.log('Initialized git directory');
}
