import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    const isLocal = command === "serve";
    return { 
        plugins: [svelte()],
        base: isLocal ? "/" : "/flashcard/",
        define: {
            __IS_LOCAL__: JSON.stringify(isLocal),
        },
    };
})
