// External Library
import { useState } from "react";
import { toast } from "sonner";

// Service
import postMovieService from "../../services/post/postMovie";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Type Guard
import { isLeft } from "@/shared/patterns/either";

// Types
import type { CreateMoviePayload, Movie } from "../../types";

interface UseCreateMovieResponse {
  createMovie: (payload: CreateMoviePayload) => Promise<Movie | null>;
  isLoading: boolean;
  error: ApplicationError | null;
}

export default function useCreateMovie(): UseCreateMovieResponse {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApplicationError | null>(null);

  const createMovie = async (payload: CreateMoviePayload) => {
    setIsLoading(true);
    setError(null);

    const result = await postMovieService(payload);

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao criar filme", {
        description: result.value.message,
      });
      setIsLoading(false);
      return null;
    }

    toast.success(`o filme ${result.value.name} foi criado com sucesso!`);
    setIsLoading(false);
    return result.value;
  };

  return {
    createMovie,
    isLoading,
    error,
  };
}
