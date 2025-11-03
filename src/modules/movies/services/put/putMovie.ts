// Infra
import { AxiosClient } from "../../../../infra/http/axios/axiosClient";
import { isAxiosError } from "axios";

// Type Guard
import { type Either, right } from "@/shared/patterns/either";

// Error
import { ApplicationError } from "@/shared/errors/base/ApplicationError";

// Factory
import errorFactory from "@/shared/errors/factory/errorFactory";

// Types
import type { PutMoviePayload, PutMovieResponse } from "../../types";

export default async function putMovie(
  payload: PutMoviePayload
): Promise<Either<ApplicationError, PutMovieResponse>> {
  const { id, ...rest } = payload;
  try {
    const { data: response } = await AxiosClient.put<PutMovieResponse>(
      `movies/${encodeURIComponent(id)}`,
      rest
    );
    return right(response);
  } catch (error) {
    let message = "Update movie failed";

    if (isAxiosError(error)) {
      message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return errorFactory("custom", message);
  }
}
