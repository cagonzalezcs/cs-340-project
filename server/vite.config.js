import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import ImportMetaEnvPlugin from '@import-meta-env/unplugin';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 4000,
  },
  plugins: [
    ImportMetaEnvPlugin.vite({
      example: '.env.example',
    }),
    ...VitePluginNode({
      adapter: 'express',
      appPath: './app.js',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {},
    }),
  ],
});
