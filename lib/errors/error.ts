export class AppError extends Error {
  code: Code;
  meta: Meta;

  constructor({ code, meta = {} }: Options) {
    super(code);
    this.code = code;
    this.meta = meta;

    Error.captureStackTrace(this, AppError);
  }
}

type Options = {
  code: Code;
  meta?: Meta;
};
type Code = string;
type Meta = Record<string, unknown>;
