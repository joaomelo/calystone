import type {
  FailData,
  OkData,
  StatusData
} from "./data";

import { throwError } from "../throwers";

export class Status {
  public readonly cause?: string;
  public readonly ok: boolean;

  protected constructor(state: StatusData) {
    this.ok = state.ok;
    if (!state.ok) {
      this.cause = state.cause;
    }
  }

  static fail(cause: string): Status {
    return new Status({
      cause,
      ok: false
    });
  }

  static ok(): Status {
    return new Status({ ok: true });
  }

  isFail(): this is FailData {
    return !this.ok;
  }

  isOk(): this is OkData {
    return this.ok;
  }

  throwOnFail(): void {
    if (this.isFail()) throwError(this.cause);
  }
}
