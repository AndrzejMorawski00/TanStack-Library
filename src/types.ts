export type Book = {
    id: string;
    title: string;
    author: string;
    year: string;
    description: string;
    copies: number;
    price: number;
    genreId: string;
};

export type Genre = {
    id: string;
    name: string;
};

export type TableRow = Book & {
    genre: Genre;
};
