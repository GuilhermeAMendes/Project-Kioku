// External Library
import { TriangleAlertIcon, InfoIcon } from "lucide-react";

// Hooks
import useGetAllMovies from "../../hooks/get/useGetAllMovies";

// Components
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { MovieCardDetail } from "../../components/cards/MovieCardDetail";
import { MovieCardDetailSkeleton } from "../../components/skeletons/MovieCardDetailSkeleton";
import { CancelButton } from "../../components/buttons/CancelButton";

export default function ShowCasePage() {
  const { movies, error, isLoading } = useGetAllMovies();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col space-y-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <MovieCardDetailSkeleton key={index} />
            ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar</AlertTitle>
          <AlertDescription>
            {error.message || "Não foi possível buscar seus filmes."}
          </AlertDescription>
        </Alert>
      );
    }

    if (movies.length === 0) {
      return (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Nenhum filme encontrado</AlertTitle>
          <AlertDescription>
            Parece que você ainda não cadastrou nenhum filme. Comece a registrar
            para ver seus filmes aqui!
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="flex flex-col">
        {movies.map((movie) => (
          <MovieCardDetail key={movie.id} movie={movie} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Filmes</h1>
          <p className="text-muted-foreground">
            Aqui está o histórico de todos os filmes que você registrou...
          </p>
        </div>
        <CancelButton />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
