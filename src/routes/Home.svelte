<script lang="ts">
	import Album from "../components/Album.svelte";
    import { AlbumRegistry } from "../lib/Albums";
</script>

<div class="albums">
    {#each AlbumRegistry.getAllAlbums() as album, index}
        <Album {album} {index} />
    {/each}
</div>

<style>
    div.albums {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        
        padding: 1rem;    
        gap: 1rem;
    }
</style>