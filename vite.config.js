import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from "vite-svg-loader";

export default defineConfig({
    plugins: [
        vue(),
        symfonyPlugin(),
        svgLoader(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets')
        }
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
      },
});
