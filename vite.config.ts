/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

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
      external: ['react', 'react-dom', 'react-player', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-player': 'ReactPlayer',
        },
      },
      plugins: [
        visualizer({
          gzipSize: true,
          open: true,
        }),
      ],
    },
    minify: 'esbuild',
    sourcemap: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    copyPublicDir: false,
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
