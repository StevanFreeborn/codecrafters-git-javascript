import { createGitDirectory } from '../app/commands';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it, vi } from 'vitest';

vi.mock('fs', () => ({
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}));

describe('createGitDirectory', () => {
  it('should create a .git directory', () => {
    createGitDirectory();

    expect(join).toHaveBeenCalledWith(process.cwd(), '.git');
    expect(mkdirSync).toHaveBeenCalledWith(`${process.cwd()}/.git`, { recursive: true });
  });

  it('should create a .git/objects directory', () => {
    createGitDirectory();

    expect(join).toHaveBeenCalledWith(process.cwd(), '.git');
    expect(mkdirSync).toHaveBeenCalledWith(`${process.cwd()}/.git/objects`, { recursive: true });
  });

  it('should create a .git/refs directory', () => {
    createGitDirectory();

    expect(join).toHaveBeenCalledWith(process.cwd(), '.git');
    expect(mkdirSync).toHaveBeenCalledWith(`${process.cwd()}/.git/refs`, { recursive: true });
  });

  it('should create a .git/HEAD file', () => {
    createGitDirectory();

    expect(join).toHaveBeenCalledWith(process.cwd(), '.git');
    expect(writeFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/.git/HEAD`,
      'ref: refs/heads/main\n'
    );
  });
});
