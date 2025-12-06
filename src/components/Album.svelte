<script lang="ts">
    import { AlbumRegistry } from '../lib/Albums';
	import { Navigate } from '../Router';

    let props = $props();
    let album = props.album || {
        title: "Sample Album",
        description: "This is a sample album description."
    };
    let index = props.index || 0;

    function deleteAlbum(index: number) {
        if (confirm(`Are you sure you want to delete the album "${album.title}"? This action cannot be undone.`)) {
            AlbumRegistry.deleteAlbum(index);
            window.location.reload();
        }
    }
</script>

<div class="card-album">
    <div class="card-album-info">
        <h2 class="card-album-title">{album.title}</h2>
        <p class="card-album-description">{album.description}</p>
        <div class="flex"></div>
        <div class="button-row">
            <button class="learn" onclick={() => Navigate(`/learn?album=${index}`)}>
                Learn
            </button>
            <button class="edit" onclick={() => Navigate(`/edit?album=${index}`)}>
                Edit
            </button>
            <button class="delete red" onclick={() => deleteAlbum(index)}>
                Delete
            </button>
        </div>
    </div>
    <img src="https://picsum.photos/seed/{index + 1}/200/200" alt="Album Cover" class="card-album-cover" />
</div>

<style>

div.card-album {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    padding: 0;
    margin: 0;

    border: none;
    border-radius: 8px;
    background-color: var(--secondary-color);

    color: var(--text-color);
    text-decoration: none;
    text-align: left;
    scale: 1.0;

    overflow: hidden;
    box-shadow: 0.25rem 0.25rem 0.1rem rgba(0, 0, 0, 0.25);

    transition: box-shadow 0.2s ease, scale 0.2s ease;

    pointer-events: none;
}

div.card-album::after {
    content: "";

    display: block;
    position: absolute;
    
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;
    
    box-shadow: inset 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.33);
}

div.card-album-info {
    display: flex;
    flex-direction: column;
    
    flex: 1;
    height: 100%;
    padding: 1rem;
}

h2.card-album-title {
    margin: 0;
    font-size: 1.25rem;
}

p.card-album-description {
    margin: 0;
    font-size: 1rem;
    color: var(--text-secondary-color);
}

img.card-album-cover {
    display: block;
    position: relative;

    width: 6rem;
    height: 12rem;
    object-fit: cover;

    user-select: none;
}

div.flex {
    flex: 1;
}

button.delete {
    margin-left: 0.5rem;
}

button.red {
    background-color: #ff8888;
}

button.red:hover {
    background-color: #ff5555;
}

</style>