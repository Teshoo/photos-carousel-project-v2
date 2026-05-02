import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from "vite-svg-loader";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    plugins: [
        vue(),
        symfonyPlugin({
            viteDevServerHostname: 'localhost'
        }),
        svgLoader(),
        mkcert()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets')
        }
    },
    server: {
        https: true,
        host: '0.0.0.0',
    },
    build: {
        rollupOptions: {
            input: {
                app: "./assets/js/app.ts"
            },
        }
    },
    test: {
        coverage: {
          provider: 'istanbul',
          reporter: ['text', 'json', 'html']
        },
        environment: 'happy-dom'
      },
});
