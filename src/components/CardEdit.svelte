<script lang="ts">
    let props = $props();

    let card: { front: string; back: string } = props.card || { front: '', back: '' };
    let index: number = props.index || 0;
    let deleteFunction: (() => void) = props.onDelete || (() => {});
</script>

<div class="card-edit">
    <div class="card-info">
        {index + 1}
        <button class="delete" onclick={() => deleteFunction()}>
            🗑️
        </button>
    </div>
    <textarea class="card-front" value={card.front} placeholder="Front Side"></textarea>
    <textarea class="card-back" value={card.back} placeholder="Back Side"></textarea>
</div>

<style>
    div.card-edit {
        display: flex;
        flex-direction: row;

        background-color: var(--secondary-color);
        border-radius: 0.5rem;
    }

    div.card-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        
        margin: 0.5rem;
        gap: 0.5rem;

        font-size: 1.25rem;
        font-weight: bold;
        color: var(--text-color);
    }

    button.delete {
        font-size: 1rem;
        padding: 0.25rem;
        border: none;
        background-color: var(--ternary-color);
        cursor: pointer;
    }

    button.delete:hover {
        background-color: var(--accent-color);
    }

    textarea.card-front,
    textarea.card-back {
        flex: 1;
        padding: 0.5rem;
        resize: vertical;
        min-height: 5rem;
    }
</style>