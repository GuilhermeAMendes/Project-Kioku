// External Library
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Service
import getAllMoviesService from "../../services/get/getAllMovies";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Type Guard
import { isLeft } from "@/shared/patterns/either";

// Types
import type { Movie } from "../../types";
interface UseGetAllMoviesResponse {
  movies: Movie[];
  isLoading: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export default function useGetAllMovies(): UseGetAllMoviesResponse {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApplicationError | null>(null);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getAllMoviesService();

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao restaurar filmes", {
        description: result.value.message,
      });
      setIsLoading(false);
      return;
    }

    setMovies(result.value);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    movies,
    isLoading,
    error,
    refetch: loadMovies,
  };
}
