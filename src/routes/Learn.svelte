<script lang="ts">
	import { on } from "svelte/events";
	import { ExampleAlbum } from "../lib/Albums";
	import { GetCurrentParams } from "../Router";
	import { onMount } from "svelte";

    const params = GetCurrentParams();
    const albumIndex = params.album || 'none';

    let cardIndex = 0;
    const album = ExampleAlbum;
    album.shuffle();

    function fillCard() {
        if (isFront) {
            return album.getNextCard(cardIndex).front;
        } else {
            return album.getNextCard(cardIndex).back;
        }
    }

    let animating = false;
    let isFront = true;

    let prev: HTMLDivElement;
    let active: HTMLDivElement;
    let next: HTMLDivElement;
    let nextHidden: HTMLDivElement;

    onMount(() => {
        const cardInside = active.querySelector('.card-inside') as HTMLDivElement;
        cardInside.innerHTML = fillCard();
    })
</script>

<div class="learn-page">
    <div class="learn">
        <div class="cards">
            <div bind:this={prev} class="card prev-card">
                <div class="card-inside">
                </div>
            </div>
            <div bind:this={next} class="card next-card">
                <div class="card-inside">
                </div>
            </div>
            <div bind:this={nextHidden} class="card next-card hidden-right">
                <div class="card-inside">
                </div>
            </div>
            <div bind:this={active} class="card active-card active-card-left">
                <div class="card-inside">
                </div>
            </div>
        </div>
        <div class="button-row">
            <button class="next" onclick={() => {
                if (animating) return; // Prevent if already animating
                animating = true;
                prev.classList.add('hidden-left');
                prev.classList.remove('prev-card');
            
                active.classList.add('prev-card');
                active.classList.remove('active-card', 'active-card-left');
            
                next.classList.add('active-card-right', 'active-card');
                next.classList.remove('next-card');
            
                nextHidden.classList.add('next-card');
                nextHidden.classList.remove('hidden-right');
                setTimeout(() => {
                    const temp = prev;
                    prev = active;
                    active = next;
                    next = nextHidden;
                    nextHidden = temp;
            
                    nextHidden.classList.add('hidden-right', 'next-card');
                    nextHidden.classList.remove('hidden-left');

                    active.classList.add('active-card-left');
                    active.classList.remove('active-card-right');

                    animating = false;

                    cardIndex++;
                    isFront = true;

                    const childElement = active.querySelector('.card-inside') as HTMLDivElement;
                    childElement.innerHTML = album.getNextCard(cardIndex).front;
                }, 100);
            }}>
                Next
            </button>
            <button class="flip" onclick={() => {
                if (animating) return;
                animating = true;

                active.classList.add('rotate-card');
                const childElement = active.querySelector('.card-inside') as HTMLDivElement;

                setTimeout(() => {
                    active.classList.add('disable-transition');
                    active.classList.remove('rotate-card');
                    setTimeout(() => {
                        active.classList.remove('disable-transition');
                    }, 1);

                    animating = false;
                }, 100);

                setTimeout(() => {
                    isFront = !isFront;
                    if (isFront) {
                        childElement.innerHTML = album.getNextCard(cardIndex).front;
                    } else {
                        childElement.innerHTML = album.getNextCard(cardIndex).back;
                    }
                }, 50);
            }}>
                Flip
            </button>
        </div>
    </div>
</div>

<style>
    .learn-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        flex: 1;
        padding: 1rem;
        margin: 0;
    }

    .learn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 80ch;
        height: 32em;
        padding: 1rem;

        border: none;
        border-radius: 8px;
        background-color: var(--secondary-color);

        box-shadow: 0.25rem 0.25rem 0.1rem rgba(0, 0, 0, 0.25);
    }

    .cards {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;

        perspective: 1000px;

        filter: drop-shadow(0 0 1em black);
    }

    .card {
        --card-width: 24rem;
        width: var(--card-width);
        height: 16rem;

        border: none;
        border-radius: 8px;
        background-color: var(--ternary-color);

        transition: translate 0.2s ease, scale 0.2s ease, opacity 0.2s ease, left 0.2s ease, right 0.2s ease, rotate 0.2s ease;
    }

    .prev-card {
        position: absolute;
        left: 3rem;
        scale: 0.9;
        opacity: 0.5;
        rotate: z -5deg;
    }

    .active-card {
        position: absolute;
        
        transform-style: preserve-3d;
        z-index: 1;
    }

    :global(.active-card-left) {
        left: calc(50% - var(--card-width) / 2);
    }

    :global(.active-card-right) {
        right: calc(50% - var(--card-width) / 2);
    }

    .next-card {
        position: absolute;
        right: 3rem;
        scale: 0.9;
        opacity: 0.5;
        rotate: z 5deg;
    }

    :global(.hidden-left) {
        position: absolute;
        left: 2rem;
        scale: 0.8;
        opacity: 0;
        rotate: -10deg;
    }

    .hidden-right {
        position: absolute;
        right: 2rem;
        scale: 0.8;
        opacity: 0;
        rotate: 10deg;
    }

    .card-inside {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
        padding: 1rem;

        text-align: justify;
        font-size: 1.5rem;
                
        color: var(--text-color);
    }

    :global(.rotate-card) {
        rotate: x 180deg;
    }

    :global(.disable-transition) {
        transition: none !important;
    }
</style>