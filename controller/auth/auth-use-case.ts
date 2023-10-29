import type { UseCase } from "@controller/use-case";
import { Artifacts } from "@model/artifacts";

export class AuthUseCase implements UseCase {
  readonly name = "AUTH";
  _artifacts: Artifacts;

  constructor({ artifacts }: Options) {
    this._artifacts = artifacts;
  }

  is(name: string) {
    return name === this.name;
  }

  async signIn() {
    await this._artifacts.open();
  }
}

type Options = {
  artifacts: Artifacts;
};
