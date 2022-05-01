import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
        port: 4000
    },
    plugins: [
        vue(),
        ...VitePluginNode({
            adapter: 'express',
            appPath: './server/app.js',
            exportName: 'viteNodeApp',
            tsCompiler: 'esbuild',
            swcOptions: {}
        })
    ]
})
