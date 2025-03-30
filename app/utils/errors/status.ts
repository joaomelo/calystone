import { throwError } from "..";

interface StatusFail {
  ok: false;
  cause: string;
}

interface StatusOk {
  ok: true;
  cause?: undefined;
}

type StatusState = StatusFail | StatusOk;

export class Status {
  public readonly cause?: string;
  public readonly ok: boolean;

  private constructor({ cause, ok }: StatusState) {
    this.ok = ok;
    this.cause = cause;
  }

  static fail(cause: string): Status {
    return new Status({ cause, ok: false });
  }

  static ok(): Status {
    return new Status({ ok: true });
  }

  isFail(): this is StatusFail {
    return !this.ok;
  }

  isOk(): this is StatusOk {
    return this.ok;
  }

  throwOnFail(): void {
    if (this.isFail()) throwError(this.cause);
  }
}