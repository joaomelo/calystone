export class AppError extends Error {
  constructor({ code, meta = {} }) {
    super(code);
    this.code = code;
    this.meta = meta;

    Error.captureStackTrace(this, AppError);
  }
}
