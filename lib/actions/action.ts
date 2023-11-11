import type { Payload } from "@lib/data";
import type { AppError } from "@lib/errors";

export type Action = {
  name: string;
  payload?: Payload;
};

export type Result = {
  success: boolean;
  error: AppError;
};
