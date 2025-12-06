<script lang="ts">
	import { loadSettings, saveSettings, type Settings } from "../lib/Settings";

    const settings = $state<Settings>(loadSettings());
</script>

<div class="settings">
    <h1>Settings</h1>
    <div class="setting-item">
        <label for="shuffle-cards">Shuffle Cards When Learning</label>
        <input type="checkbox" id="shuffle-cards" bind:checked={settings.shouldShuffle} 
            onchange={() => saveSettings(settings)} />
    </div>
    <div class="setting-item">
        <label for="enable-mathjax">Enable MathJax Rendering</label>
        <input type="checkbox" id="enable-mathjax" bind:checked={settings.enableMathJax} 
            onchange={() => saveSettings(settings)} />
    </div>
</div>

<style>
    div.settings {
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

    h1 {
        color: var(--accent-color);
        margin: 0.5em 0;
    }

    .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        margin-bottom: 1rem;
        gap: 1rem;
    }

    input[type="checkbox"] {
        position: relative;

        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;

        width: 3rem;
        height: 1.5rem;

        background-color: var(--main-color);
        border: none;
        border-radius: 1rem;
    }

    input[type="checkbox"]:after {
        position: absolute;
        left: 0;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        content: '❌';

        font-size: 0.75rem;

        width: 1.5rem;
        height: 1.5rem;

        background-color: var(--accent-color);
        border-radius: 50%;

        transition: margin-left 0.2s ease, scale 0.1s ease;
    }

    input[type="checkbox"]:hover {
        cursor: pointer;
    }

    input[type="checkbox"]:hover:after {
        scale: 1.1;
    }

    input[type="checkbox"]:checked:after {
        content: '✔️';
        margin-left: 1.5rem;
    }
</style>