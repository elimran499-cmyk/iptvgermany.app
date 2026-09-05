import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // React und Motion aendern sich zwischen Deploys nicht — als eigener
          // Chunk bleiben sie beim naechsten Besuch im Cache, statt bei jeder
          // Textaenderung erneut geladen zu werden.
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/motion') || id.includes('framer-motion')) return 'motion';
            if (id.includes('/react/') || id.includes('/react-dom/') ||
                id.includes('/scheduler/')) return 'react';
            return undefined;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
