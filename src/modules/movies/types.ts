export type Genre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Sci-Fi"
  | "Horror"
  | "Romance"
  | "Adventure"
  | "Thriller"
  | "Documentary"
  | "Fantasy";

export interface Movie {
  id: string;
  name: string;
  genre: Genre;
  year: number;
}

