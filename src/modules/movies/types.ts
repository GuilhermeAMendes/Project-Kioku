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

export type GetAllMoviesResponse = Movie[];

export type GetMovieByIdPayload = Pick<Movie, "id">;

export type GetMovieByIdResponse = Movie;

export type CreateMoviePayload = Omit<Movie, "id">;

export type CreateMovieResponse = Movie;

export type PutMoviePayload = Movie;

export type PutMovieResponse = Movie;

export type DeleteMoviePayload = Pick<Movie, "id">;

export type DeleteMovieResponse = Movie;
