// External Library
import { useState } from "react";
import { toast } from "sonner";

// Service
import putMovieService from "../../services/put/putMovie";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Type Guard
import { isLeft } from "@/shared/patterns/either";

// Types
import type { PutMoviePayload, Movie } from "../../types";

interface UsePutMovieResponse {
  updateMovie: (payload: PutMoviePayload) => Promise<Movie | null>;
  isLoading: boolean;
  error: ApplicationError | null;
}

export default function usePutMovie(): UsePutMovieResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApplicationError | null>(null);

  const updateMovie = async (payload: PutMoviePayload) => {
    setIsLoading(true);
    setError(null);

    const result = await putMovieService(payload);

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao atualizar os dados do filme", {
        description: result.value.message,
      });
      setIsLoading(false);
      return null;
    }

    toast.success(
      `Os dados do filme ${result.value.name} foram atualizados com sucesso!`
    );
    setIsLoading(false);
    return result.value;
  };

  return {
    updateMovie,
    isLoading,
    error,
  };
}
