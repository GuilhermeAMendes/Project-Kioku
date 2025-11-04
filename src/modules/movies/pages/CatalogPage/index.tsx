// External Library
import { TriangleAlertIcon, InfoIcon } from "lucide-react";

// Hooks
import useGetAllMovies from "../../hooks/get/useGetAllMovies";

// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { MovieItemSkeleton } from "../../components/skeletons/MovieItemSkeleton";
import MovieItem from "../../components/cards/MovieItem";

export default function CatalogPage() {
  const { movies, error, isLoading } = useGetAllMovies();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col space-y-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <MovieItemSkeleton key={index} />
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
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Meus Filmes</CardTitle>
          <CardDescription>
            Aqui está o histórico de todos os filmes que você registrou na
            plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
