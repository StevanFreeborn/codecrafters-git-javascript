import {
  catFile,
  createGitDirectory,
  getObjectDirectory,
  getObjectFileName,
} from '../app/commands';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it, vi } from 'vitest';
import { deflateSync } from 'zlib';

vi.mock('fs', () => ({
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  readFileSync: vi.fn(),
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

  describe('getObjectDirectory', () => {
    it('should return the first two characters of the object hash', () => {
      const fakeHash = 'abcdef1234567890';
      expect(getObjectDirectory(fakeHash)).toBe('ab');
    });
  });

  describe('getObjectFileName', () => {
    it('should return the object hash without the first two characters', () => {
      const fakeHash = 'abcdef1234567890';
      expect(getObjectFileName(fakeHash)).toBe('cdef1234567890');
    });
  });

  describe('catFile', () => {
    it('should print the contents of a file', () => {
      const compressedData = deflateSync(Buffer.from('blob 5\0hello', 'utf-8'));
      readFileSync.mockReturnValue(Buffer.from(compressedData, 'utf-8'));

      const consoleSpy = vi.spyOn(console, 'log');

      catFile('abcdef1234567890');

      expect(readFileSync).toHaveBeenCalledWith(`${process.cwd()}/.git/objects/ab/cdef1234567890`);

      expect(consoleSpy).toHaveBeenCalledWith('hello');
    });
  });
});
