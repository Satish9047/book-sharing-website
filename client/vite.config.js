// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                // eslint-disable-next-line no-undef
                main: resolve(__dirname, "index.html"),
                // eslint-disable-next-line no-undef
                nested: resolve(__dirname, "view/index.html"),
            },
        },
    },
});