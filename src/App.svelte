<script lang="ts">
    import Header from './components/Header.svelte';
	import Router from './components/Router.svelte';
</script>

<Header />
<main id="current-page">
    <Router />
</main>

<style>
main {
    display: flex;
    flex-direction: column;

    flex: 1;  
}

:global(#current-page) {
    transition: opacity 100ms ease-in-out;
    opacity: 1;
}

:global(#current-page.fade-out) {
    opacity: 0;
}
</style>