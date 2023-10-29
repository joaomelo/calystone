import type { Driver } from "@service";

import { ArtifactsModel } from "@model/artifacts";
import { AuthUseCase } from "./use-cases";

export class Control {
  _artifacts: Artifacts;
  _useCases: UseCases;
  _authUseCase;

  constructor(driver: Driver) {
    this._artifacts = new Artifacts(driver);
    this._useCases = new UseCases("AUTH", "ARTIFACTS_PLAN", "ARTIFACTS_EDIT");
  }

  get artifacts() {
    return this._artifacts;
  }
}
