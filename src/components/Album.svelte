<script lang="ts">
    import Counter from '../lib/Counter';
	import { Navigate } from '../Router';

    let index = Counter.next();
</script>

<button class="card-album" onclick={() => Navigate(`/learn?album=${index}`)}>
    <div class="card-album-info">
        <h2 class="card-album-title">Title</h2>
        <p class="card-album-description">Description</p>
    </div>
    <img src="https://picsum.photos/seed/{index}/200/200" alt="Album Cover" class="card-album-cover" />
</button>

<style>

button.card-album {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    padding: 0;
    margin: 0;

    border: none;
    border-radius: 8px;
    background-color: var(--secondary-color);

    text-align: left;
    scale: 1.0;

    overflow: hidden;
    box-shadow: 0.25rem 0.25rem 0.1rem rgba(0, 0, 0, 0.25);

    transition: box-shadow 0.2s ease, scale 0.2s ease;
}

button.card-album:hover {
    scale: 1.02;

    box-shadow: 0.5rem 0.5rem 0.25rem rgba(0, 0, 0, 0.35);
}

button.card-album::after {
    content: "";

    display: block;
    position: absolute;
    
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;
    
    box-shadow: inset 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.33);
}

button.card-album:active {
    scale: 0.98;

    box-shadow: 0.1rem 0.1rem 0.05rem rgba(0, 0, 0, 0.2);
}

button.card-album:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 4px;
}

div.card-album-info {
    flex: 1;
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

    width: 12rem;
    height: 12rem;
    object-fit: cover;

    user-select: none;
}

</style>