import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    id: number;
    authors: Author[];
    genre: Genre;
    title: string;
    publicationYear: string;
    editor: string;
    publisher: string;
    pages: number;
    price: number;
    description: string;
    img: string;
  }