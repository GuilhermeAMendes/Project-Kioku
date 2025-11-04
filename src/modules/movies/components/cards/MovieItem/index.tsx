// Types
import type { Movie } from "@/modules/movies/types";

interface MovieItemPayload {
  movie: Pick<Movie, "id" | "name">;
}

// Utils
import { useNavigationHandler } from "@/shared/hooks/navigation/useNavigation";

export default function MovieItem({ movie }: MovieItemPayload) {
  const { navigateTo } = useNavigationHandler();

  return (
    <div
      className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={() => navigateTo(`/movies/${movie.id}`)}
    >
      <div className="mb-2 sm:mb-0">
        <p className="font-semibold text-lg">{movie.name}</p>
        <p className="text-sm text-muted-foreground font-mono">{movie.id}</p>
      </div>
    </div>
  );
}
