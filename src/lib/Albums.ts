class Card {
    public front: string;
    public back: string;

    constructor(front: string, back: string) {
        this.front = front;
        this.back = back;
    }
}

class Album {
    public title: string = "Unnamed Album";
    public description: string = "An album of flashcards.";
    public cards: Card[];

    constructor(name: string, description: string, cards: Card[] = []) {
        this.title = name;
        this.description = description;
        this.cards = cards;
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public getNextCard(index: number): Card {
        while (index < 0)
            index += this.cards.length;
        index = index % this.cards.length;
        return this.cards[index];
    }

    public static deserialize(data: string): Album {
        const parsed = JSON.parse(data);
        const title = parsed.title || "Unnamed Album";
        const description = parsed.description || "An album of flashcards.";
        const cards = (parsed.cards || []).map((cardData: any) => new Card(cardData.front, cardData.back));
        return new Album(title, description, cards);
    }

    public serialize(): string {
        const data = {
            title: this.title,
            cards: this.cards.map(card => ({ front: card.front, back: card.back })),
        };
        return JSON.stringify(data);
    }
}

export const ExampleAlbum = new Album("Example Album", "An example album.", [
    new Card("What is the capital of France?", "Paris"),
    new Card("What is 2 + 2?", "4"),
    new Card("What is the capital of Japan?", "Tokyo"),
    new Card("What is the largest planet in our solar system?", "Jupiter"),
    new Card("What is the chemical symbol for water?", "H2O"),
    new Card("Who wrote 'Romeo and Juliet'?", "William Shakespeare"),
]);

class AlbumCollection {
    private albums: Album[];

    constructor() {
        this.albums = [];
    }

    public addAlbum(album: Album): void {
        this.albums.push(album);
    }

    public getAllAlbums(): Album[] {
        return this.albums;
    }
    
    public getAlbum(index: number): Album | null {
        if (index < 0 || index >= this.albums.length) {
            return null;
        }
        return this.albums[index];
    }

    public updateAlbum(albumIndex: number, editedAlbum: { cards: Card[]; title: string; description: string; }) {
        if (albumIndex < 0 || albumIndex >= this.albums.length) {
            return;
        }
        this.albums[albumIndex].cards = editedAlbum.cards;
        this.albums[albumIndex].title = editedAlbum.title;
        this.albums[albumIndex].description = editedAlbum.description;
    }
}

const AlbumRegistry = new AlbumCollection();
AlbumRegistry.addAlbum(ExampleAlbum);

export { Card, Album, AlbumRegistry };