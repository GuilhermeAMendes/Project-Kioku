// Types
import type { Movie } from "@/modules/movies/types";

export default function MovieInfo({ movie }: { movie: Movie }) {
  return (
    <div className="space-y-4 rounded-lg border bg-muted p-4">
      <div>
        <h4 className="font-semibold">Nome</h4>
        <p className="text-muted-foreground">{movie.name}</p>
      </div>
      <div>
        <h4 className="font-semibold">Gênero</h4>
        <p className="text-muted-foreground">{movie.genre}</p>
      </div>
      <div>
        <h4 className="font-semibold">Ano</h4>
        <p className="text-muted-foreground">{movie.year}</p>
      </div>
    </div>
  );
}
