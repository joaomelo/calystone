export class AppError extends Error {
  code;
  meta;

  constructor({ code, meta = {} }) {
    super(code);
    this.code = code;
    this.meta = meta;

    Error.captureStackTrace(this, AppError);
  }
}
