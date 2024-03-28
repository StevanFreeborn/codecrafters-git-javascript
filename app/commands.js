import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function createGitDirectory() {
  const gitDirPath = join(process.cwd(), '.git');

  mkdirSync(gitDirPath, { recursive: true });
  mkdirSync(join(gitDirPath, 'objects'), { recursive: true });
  mkdirSync(join(gitDirPath, 'refs'), { recursive: true });

  writeFileSync(join(gitDirPath, 'HEAD'), 'ref: refs/heads/main\n');
  console.log('Initialized git directory');
}
