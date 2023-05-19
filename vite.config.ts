/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, './index.lib.ts'),
      name: 'gfs-components-lib',
      fileName: (format) => `index.${format}.js`,
      formats: ['umd', 'es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM',
        },
      },
    },
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 5555,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
