<script lang="ts">
	import CardEdit from "../components/CardEdit.svelte";
	import { Album, AlbumRegistry, ExampleAlbum } from "../lib/Albums";
	import { GetCurrentParams, Navigate } from "../Router";

    const params = GetCurrentParams();
    const albumIndex = parseInt(params.album);

    const source = AlbumRegistry.getAlbum(albumIndex) || ExampleAlbum;

    const editedAlbum = $state({
        ...source,
        cards: source.cards
    });

    function addCard() {
        editedAlbum.cards.push({ front: "", back: "" });
        setTimeout(() => {
            document.body.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }

    function deleteAlbum() {
        if (albumIndex >= 0) {
            AlbumRegistry.deleteAlbum(albumIndex);
        }
        Navigate('/');
    }

    function onDelete(index: number) {
        editedAlbum.cards.splice(index, 1);
    }

    function onEdit(which: 'front' | 'back', index: number, value: string) {
        editedAlbum.cards[index][which] = value;
    }

    function saveAlbum() {
        if (albumIndex >= 0) {
            AlbumRegistry.updateAlbum(albumIndex, editedAlbum);
        } else {
            AlbumRegistry.addAlbum(new Album(editedAlbum.title, editedAlbum.description, editedAlbum.cards));
        }

        Navigate('/');
    }
</script>

<div class="edit">
    <input type="text" class="album-title" bind:value={editedAlbum.title} placeholder="Album Title" />
    <textarea class="album-description" bind:value={editedAlbum.description} placeholder="Album Description"></textarea>
    <div class="cards">
        {#each editedAlbum.cards as card, index}
            <CardEdit {card} {index} onDelete={() => onDelete(index)} onEdit={onEdit}/>
        {/each}
    </div>
    <button onclick={() => addCard()} class="add-button">
        <span>+</span>
    </button>
    <button onclick={() => saveAlbum()} class="save-button">
        💾
    </button>
    <button class="delete-button" onclick={() => deleteAlbum()}>
        🗑️
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

    button.save-button {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        
        top: 4rem;
        right: 1rem;

        width: 3rem;
        height: 3rem;
        
        font-size: 1.5rem;
        border-radius: 50%;
    }

    button.delete-button {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        
        top: 4rem;
        right: 5rem;

        width: 3rem;
        height: 3rem;
        
        font-size: 1.5rem;
        border-radius: 50%;
    }
</style>