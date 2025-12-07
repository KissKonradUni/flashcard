import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import deno from '@deno/vite-plugin'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    const isLocal = command === "serve";
    return { 
        plugins: [deno(), svelte()],
        base: isLocal ? "/" : "/flashcard/",
        define: {
            __IS_LOCAL__: JSON.stringify(isLocal),
        },
    };
})
