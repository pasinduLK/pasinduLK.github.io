// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Import the plugin

export default defineConfig({
  base:"/",
  plugins: [
    react(),
    nodePolyfills({
        // Options (usually defaults are fine):
        // include: ['buffer'], // You can specify modules explicitly if needed
        globals: {
          Buffer: true, // Ensure Buffer global polyfill is included
          global: true,
          process: true,
        },
        protocolImports: true, // Needed for libraries using "node:" protocol imports
      })
  ],
  // Remove or comment out the manual 'define' and 'resolve.alias' for Buffer if using this plugin
  /*
  define: {
    'global': {},
    'Buffer': Buffer,
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
    },
  },
  */
});