// External Library
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, TriangleAlertIcon, SearchIcon, Trash2 } from "lucide-react";

// Hooks
import useDeleteMovie from "../../hooks/delete/useDeleteMovie";
import useGetMovieById from "../../hooks/get/useGetMovieById";
import { useNavigationHandler } from "@/shared/hooks/navigation/useNavigation";

// Types
import type { Movie } from "../../types";
type PageStatus = "searching" | "loading" | "confirming" | "notFound";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CancelButton } from "../../components/buttons/CancelButton";
import MovieInfo from "../../components/cards/MovieInfo";

export default function DeleteMoviePage() {
  const [status, setStatus] = useState<PageStatus>("searching");
  const [searchId, setSearchId] = useState("");
  const [foundMovie, setFoundMovie] = useState<Movie | null>(null);

  const { navigateTo } = useNavigationHandler();
  const { deleteMovie, isLoading: isDeleting } = useDeleteMovie();
  const { getMovie, isLoading: isSearching, error } = useGetMovieById();

  const handleSearch = async () => {
    if (searchId.trim() === "") {
      toast.error("Por favor, digite um ID.");
      return;
    }
    setStatus("loading");
    const result = await getMovie(searchId);

    if (result === null) {
      setStatus("notFound");
    } else {
      setFoundMovie(result);
      setStatus("confirming");
    }
  };

  const onConfirmDelete = async () => {
    if (!foundMovie) return;

    const result = await deleteMovie({ id: foundMovie.id });

    if (result) {
      navigateTo("/");
    }
  };

  if (status === "searching") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex w-full justify-between">
              <CardTitle>Remover Filme</CardTitle>
              <CancelButton />
            </div>
            <CardDescription>
              Digite o ID do filme que você deseja remover.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="searchId" className="text-sm font-medium">
                ID do Filme
              </label>
              <Input
                id="searchId"
                placeholder="Digite o ID aqui..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                disabled={isSearching}
              />
            </div>
            <Button
              type="button"
              onClick={handleSearch}
              className="w-full"
              disabled={isSearching}
            >
              {isSearching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              {isSearching ? "Buscando..." : "Procurar"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "notFound") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Filme Não Encontrado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <TriangleAlertIcon className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                {error?.message ||
                  "Nenhum filme foi encontrado com o ID fornecido."}
              </AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStatus("searching")}
            >
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "confirming" && foundMovie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex w-full justify-between">
              <CardTitle>Remover Filme</CardTitle>
              <CancelButton />
            </div>
            <CardDescription>
              Você tem certeza que deseja remover este filme?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <MovieInfo movie={foundMovie} />
            <Alert variant="destructive">
              <TriangleAlertIcon className="h-4 w-4" />
              <AlertTitle>Ação Nociva</AlertTitle>
              <AlertDescription>
                Esta ação não poderá ser desfeita. O filme será permanentemente
                removido do catálogo.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col-reverse sm:flex-row gap-2">
              <Button
                type="submit"
                variant="destructive"
                className="w-full"
                disabled={isDeleting}
                onClick={onConfirmDelete}
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                {isDeleting ? "Removendo..." : "Confirmar Remoção"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
