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

interface UseGetMovieByIdResponse {
  getMovie: (id: string) => Promise<Movie | null>;
  isLoading: boolean;
  error: ApplicationError | null;
}

export default function useGetMovieById(): UseGetMovieByIdResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApplicationError | null>(null);

  const getMovie = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getMovieByIdService({ id });

    if (isLeft(result)) {
      setError(result.value);
      toast.error("Erro ao buscar filme", {
        description: result.value.message,
      });
      setIsLoading(false);
      return null;
    }

    setIsLoading(false);
    return result.value;
  }, []);

  return {
    getMovie,
    isLoading,
    error,
  };
}
