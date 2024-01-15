/* eslint-disable no-undef */
// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                login: resolve(__dirname, "src/view/login/login.html"),
                // register: resolve(__dirname, "src/view/register/register.html"),
                // profile: resolve(__dirname, "src/view/profile/profile.html"),
            },
        },
    },
});