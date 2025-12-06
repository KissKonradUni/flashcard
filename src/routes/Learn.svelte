<script lang="ts">
	import { AlbumRegistry, ExampleAlbum } from "../lib/Albums";
	import { GetCurrentParams } from "../Router";
	import { loadSettings, type Settings } from "../lib/Settings";

    const settings = $state<Settings>(loadSettings());

    const params = GetCurrentParams();
    const albumIndex = Number(params.album);

    let cardIndex = $state(0);
    const album = AlbumRegistry.getAlbum(albumIndex) || ExampleAlbum;
    
    if (settings.shouldShuffle)
        album!.shuffle();

    let animating = false;

    let cardWarpper: HTMLDivElement;
    let card: HTMLDivElement;

    function flip() {
        card.classList.toggle('flipped');    
    }

    function go(amount: number) {
        if (card.classList.contains('flipped')) {
            flip();
            setTimeout(() => go(amount), 300);
            return;
        }

        if (animating) return;
        animating = true;

        cardWarpper.classList.add(amount > 0 ? 'rotate-left' : 'rotate-right');
        card.classList.add(amount > 0 ? 'hide-left' : 'hide-right');
        setTimeout(() => {
            cardWarpper.classList.remove(amount > 0 ? 'rotate-left' : 'rotate-right');
            card.classList.remove(amount > 0 ? 'hide-left' : 'hide-right');
            animating = false;

            cardIndex += amount;

            const childElement = card.querySelector('.front-side') as HTMLDivElement;
            childElement.innerHTML = album!.getNextCard(cardIndex).front;
            const backElement = card.querySelector('.back-side') as HTMLDivElement;
            backElement.innerHTML = album!.getNextCard(cardIndex).back;
        }, 300);
    }
</script>

<div class="learn">
    <div class="numbering">
        Card {((cardIndex % album.cards.length) + album.cards.length) % album.cards.length + 1} / {album.cards.length}
    </div>
    <div class="card-wrapper" bind:this={cardWarpper}>
        <div class="card" bind:this={card}>
            <div class="front-side">
                {album.getNextCard(cardIndex).front}
            </div>
            <div class="back-side">
                {album.getNextCard(cardIndex).back}
            </div>
        </div>
    </div>
    <div class="button-row">
        <button class="prev" onclick={() => go(-1)}>
            &lt;
        </button>
        <button class="flip" onclick={flip}>
            Flip
        </button>
        <button class="next" onclick={() => go(1)}>
            &gt;
        </button>
    </div>
</div>

<style>
    div.learn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        flex: 1;
        padding: 1rem;
        margin: 0;
        gap: 2rem;
    }

    div.numbering {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--text-color);
    }

    div.card-wrapper {
        --card-width: 24rem;
        width: var(--card-width);
        height: 16rem;

        perspective: 512px;

        transition: rotate 0.3s ease;
    }

    div.card {
        position: relative;

        width: 100%;
        height: 100%;
        --card-padding: 2rem;
        padding: var(--card-padding);

        border: none;
        border-radius: 0.5em;
        background-color: var(--secondary-color);

        box-shadow: 0 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

        transform-style: preserve-3d;
        transition: rotate 0.3s ease;
    }

    div.front-side, div.back-side {
        position: absolute;
        width:  calc(100% - var(--card-padding) * 2);
        height: calc(100% - var(--card-padding) * 2);

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.5rem;
        text-align: center;

        white-space: pre-line;
        line-break: normal;

        backface-visibility: hidden;
    }

    div.back-side {
        rotate: x 180deg;
        background-color: var(--secondary-color);
    }

    :global(div.flipped) {
        rotate: x 180deg;
    }

    :global(div.hide-left) {
        rotate: y -90deg;
    }

    :global(div.hide-right) {
        rotate: y 90deg;
    }

    :global(div.rotate-left) {
        rotate: z 10deg;
    }

    :global(div.rotate-right) {
        rotate: z -10deg;
    }
</style>