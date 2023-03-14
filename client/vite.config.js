import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
      },
      '/images': {
        target: 'http://127.0.0.1:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),

    VitePWA({
      manifest,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      includeAssets: ['**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2,woff}'],
      workbox: {
        mode: 'development',
        globPatterns: ['**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2,woff}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../server/client',
    emptyOutDir: false,
  },
});
