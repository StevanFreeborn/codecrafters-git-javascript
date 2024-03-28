import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'tests',
    coverage: {
      provider: 'istanbul',
      exclude: ['**/node_modules/**', '**/test/**'],
      reporter: ['text-summary', 'html'],
    },
  },
});
