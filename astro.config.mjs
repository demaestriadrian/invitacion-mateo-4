// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import typescript from 'vite-plugin-typescript';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
            typescript()
        ],
    }
});
