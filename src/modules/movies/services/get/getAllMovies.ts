// Infra
import { AxiosClient } from "../../../../infra/http/axios/axiosClient";
import { isAxiosError } from "axios";

// Type Guard
import { right } from "@/shared/patterns/either";

// Factory
import errorFactory from "@/shared/errors/factory/errorFactory";

// Types
import type { GetAllMoviesResponse } from "@/modules/movies/types";

export default async function getAllMovies() {
  try {
    const { data: response } = await AxiosClient.get<GetAllMoviesResponse>(
      "movies"
    );
    return right(response);
  } catch (error) {
    let message = "Restore movies failed";

    if (isAxiosError(error)) {
      message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return errorFactory("not_found", message);
  }
}
