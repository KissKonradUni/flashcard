<script lang="ts">
	import Album from "../components/Album.svelte";
</script>

<div class="albums">
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
    <Album />
</div>

<style>
    div.albums {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        
        padding: 1rem;    
        gap: 1rem;
    }
</style>