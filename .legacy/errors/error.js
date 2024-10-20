export class AppError extends Error {
  code;
  meta;

  constructor({ code, message, meta = {} }) {
    super(code);
    this.code = code;
    this.message = message || code;
    this.meta = meta;

    Error.captureStackTrace(this, AppError);
  }
}

export function appError(options) {
  throw new AppError(options);
}
