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
        rewrite: (path1) => path1.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'http://127.0.0.1:3000/',
        secure: false,
        changeOrigin: true,
      },
    }
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
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: ['**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2}'],
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
