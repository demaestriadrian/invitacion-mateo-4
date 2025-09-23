// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    output: 'static', // Asegúrate de que esté en modo estático
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp'
        }
    },
    devToolbar: {
        enabled: false  
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src'),
            },
        },
    }
});
