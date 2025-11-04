// External Library
import { useState } from "react";
import { toast } from "sonner";

// Service
import deleteMovieService from "../../services/delete/deleteMovie";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Type Guard
import { isLeft } from "@/shared/patterns/either";

// Types
import type { DeleteMoviePayload, Movie } from "../../types";

interface UseDeleteMovieResponse {
  deleteMovie: (payload: DeleteMoviePayload) => Promise<Movie | null>;
  isLoading: boolean;
  error: ApplicationError | null;
}

export default function useDeleteMovie(): UseDeleteMovieResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApplicationError | null>(null);

  const deleteMovie = async ({ id }: DeleteMoviePayload) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteMovieService({ id });

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao remover filme", {
        description: result.value.message,
      });
      setIsLoading(false);
      return null;
    }

    toast.success(`o filme ${result.value.name} foi removido com sucesso!`);
    setIsLoading(false);
    return result.value;
  };

  return {
    deleteMovie,
    isLoading,
    error,
  };
}
