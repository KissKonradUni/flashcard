<script lang="ts">
	import CardEdit from "../components/CardEdit.svelte";
	import { AlbumRegistry, ExampleAlbum } from "../lib/Albums";
	import { GetCurrentParams } from "../Router";

    const params = GetCurrentParams();
    const albumIndex = Number(params.album) || -1;

    const source = AlbumRegistry.getAlbum(albumIndex) || ExampleAlbum;

    // Create local copy of the album to edit
    const album = $state({...source});

    function addCard() {
        album.cards.push({ front: "", back: "" });
        setTimeout(() => {
            document.body.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }

    function onDelete(index: number) {
        album.cards.splice(index, 1);
        console.log(index, album.cards);
    }
</script>

<div class="edit">
    <input type="text" class="album-title" value={album.title} placeholder="Album Title" />
    <textarea class="album-description" value={album.description} placeholder="Album Description"></textarea>
    <div class="cards">
        {#each album.cards as card, index}
            <CardEdit {card} {index} onDelete={() => onDelete(index)}/>
        {/each}
    </div>
    <button onclick={() => addCard()} class="add-button">
        <span>+</span>
    </button>
</div>

<style>
    div.edit {
        display: flex;
        flex-direction: column;

        padding: 1rem;
        gap: 1rem;
    }

    input.album-title {
        font-size: 1.5rem;
        font-weight: bold;
        padding: 0.5rem;
    }

    textarea.album-description {
        font-size: 1rem;
        padding: 0.5rem;
        resize: vertical;
        min-height: 3rem;
    }

    div.cards {
        display: flex;
        flex-direction: column;
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