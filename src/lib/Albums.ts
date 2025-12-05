class Card {
    public front: string;
    public back: string;

    constructor(front: string, back: string) {
        this.front = front;
        this.back = back;
    }
}

class Album {
    public name: string;
    public cards: Card[];

    constructor(name: string, cards: Card[] = []) {
        this.name = name;
        this.cards = cards;
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public getNextCard(index: number): Card {
        index = index % this.cards.length;
        return this.cards[index];
    }
}

export const ExampleAlbum = new Album("Example Album", [
    new Card("What is the capital of France?", "Paris"),
    new Card("What is 2 + 2?", "4"),
    new Card("What is the capital of Japan?", "Tokyo"),
    new Card("What is the largest planet in our solar system?", "Jupiter"),
    new Card("What is the chemical symbol for water?", "H2O"),
    new Card("Who wrote 'Romeo and Juliet'?", "William Shakespeare"),
]);

export { Card, Album };