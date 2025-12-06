<script lang="ts">
	import Link from "../components/Link.svelte";
</script>

<div class="about">
    <h1>About Flashcard App</h1>
    <p>This application is designed to help users create, edit, and learn from flashcard albums. You can create multiple albums, each containing a set of flashcards with a front and back side.</p>
    <h2>Features</h2>
    <ul>
        <li>Create and edit flashcard albums.</li>
        <li>Add, edit, and delete individual flashcards within an album.</li>
        <li>Learn mode to review flashcards with flip animations.</li>
        <li>Shuffle cards for varied learning experiences.</li>
    </ul>
    <h2>Technologies Used</h2>
    <p>This app is built using Svelte and TypeScript, providing a fast and reactive user experience.</p>
    <h2>Contact</h2>
    <p>
        If you have any questions or feedback, feel free to reach out! 
    </p>
    <p>
        E-mail: <Link href="mailto:business@konrads.hu" target="_blank" style="display: inline-block;">business@konrads.hu</Link>
    </p>
</div>

<style>
    div.about {
        padding: 2rem;
        padding-top: 1rem;
        max-width: 65ch;
        margin: auto;
        font-family: Arial, sans-serif;
        color: var(--text-color);

        background-color: var(--secondary-color);
        border-radius: 0.5rem;

        box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.5);
    }

    h1, h2 {
        color: var(--accent-color);
        margin: 0.5em 0;
    }

    ul {
        list-style-type: disc;
        margin-left: 2rem;
    }
</style>