import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ImportMetaEnvPlugin from '@import-meta-env/unplugin';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3000,
  },
  plugins: [
    ImportMetaEnvPlugin.vite({
      example: '.env.example',
    }),
    vue(),
  ],
});
