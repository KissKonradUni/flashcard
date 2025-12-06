<script lang="ts">
	import AlbumElement from "../components/Album.svelte";
    import { Album, AlbumRegistry } from "../lib/Albums";
	import { Navigate } from "../Router";

    function newAlbum() {
        const id = AlbumRegistry.addAlbum(new Album(
            "New Album",
            "My new album.",
            []
        ));
        Navigate('/edit?album=' + id);
    }
</script>

<div class="albums">
    {#each AlbumRegistry.getAllAlbums() as album, index}
        <AlbumElement {album} {index} />
    {/each}
</div>
<button onclick={() => newAlbum()} class="add-button">
    <span>+</span>
</button>

<style>
    div.albums {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
        
        padding: 1rem;    
        gap: 1rem;
    }

    button.add-button {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        
        bottom: 1rem;
        right: 1rem;

        width: 3rem;
        height: 3rem;
        
        font-size: 2rem;
        border-radius: 50%;
    }

    button.add-button span {
        translate: 0 -0.15rem;
    }
</style>