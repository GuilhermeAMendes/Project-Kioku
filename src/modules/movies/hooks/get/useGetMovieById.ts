// External Library
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Service
import getMovieByIdService from "../../services/get/getMovieById";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Type Guard
import { isLeft } from "@/shared/patterns/either";

// Types
import type { Movie } from "../../types";

interface UseGetMovieByIdPayload {
  id: string;
}

interface UseGetMovieByIdResponse {
  movie: Movie | null;
  isLoading: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export default function useGetMovieById({
  id,
}: UseGetMovieByIdPayload): UseGetMovieByIdResponse {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApplicationError | null>(null);

  const loadMovie = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getMovieByIdService({ id });

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao restaurar filme", {
        description: result.value.message,
      });
      setIsLoading(false);
      return;
    }

    setMovie(result.value);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMovie();
  }, [id, loadMovie]);

  return {
    movie,
    isLoading,
    error,
    refetch: loadMovie,
  };
}
