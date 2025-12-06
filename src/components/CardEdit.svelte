<script lang="ts">
    const { card, index, onEdit, onDelete } = $props<{
        card: { front: string; back: string };
        index: number;
        onEdit(which: 'front' | 'back', index: number, value: string): void;
        onDelete: () => void;
    }>();
</script>

<div class="card-edit">
    <div class="card-info">
        {index + 1}
        <button class="delete" onclick={() => onDelete()}>
            🗑️
        </button>
    </div>
    <textarea class="card-front" bind:value={card.front} placeholder="Front Side" oninput={(e) => onEdit('front', index, (e.target as HTMLTextAreaElement).value)}></textarea>
    <textarea class="card-back" bind:value={card.back} placeholder="Back Side" oninput={(e) => onEdit('back', index, (e.target as HTMLTextAreaElement).value)}></textarea>
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