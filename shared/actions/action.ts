import type { Payload } from "@shared/data";
import type { AppError } from "@shared/errors";

export type Action = {
  name: string;
  payload?: Payload;
};

export type Result = {
  success: boolean;
  error: AppError;
};
