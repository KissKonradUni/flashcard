<script>
    import { Navigate } from '../Router';
	import Link from './Link.svelte';
</script>
<header>
    <Link href="/" style="font-size: 1.5rem">Flash Card App</Link>

    <div class="spacer"></div>

    <div class="buttons">
        <button onclick={() => Navigate('/')}>
            Home
        </button>
        <button onclick={() => Navigate('/settings')}>
            Settings
        </button>
        <button onclick={() => Navigate('/about')}>
            About
        </button>
    </div>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;

        padding-left: 1rem;

        background-color: var(--secondary-color);
        
        border-bottom: 2px solid var(--accent-color);

        box-shadow: inset 0 -0.5rem 0.25rem -0.25rem rgba(0, 0, 0, 0.33),
                    0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    }

    .spacer {
        flex: 1;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        
        gap: 0.5rem;
        margin-right: 0.5rem;
    }

    button {
        margin: 0.5rem 0;
        padding: 0.5rem 1rem;
        font-size: 1rem;

        border: none;
        border-radius: 4px;
        background-color: var(--text-color);
        color: var(--main-color);

        box-shadow: 0.1rem 0.1rem 0.25rem rgba(0, 0, 0, 0.33);

        transition: background-color 0.2s ease;
    }

    button:hover {
        background-color: var(--accent-color);
    }
</style>