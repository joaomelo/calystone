import type { Predicate, Ideable } from "@lib";
import type { Driver } from "@service";
import type { ArtifactPayloadWithId, ArtifactPayload } from "../artifact";

import { ArtifactsSelect } from "../select";
import { addArtifact, delArtifact, editArtifact } from "../mutations";

export class Artifacts {
  _driver: Driver;
  _select: ArtifactsSelect;

  constructor(driver: Driver) {
    this._driver = driver;
    this._select = new ArtifactsSelect(driver);
  }

  async open() {
    await this._select.open();
  }

  close() {
    this._select.close();
  }

  filter(predicate?: Predicate) {
    return this._select.filter(predicate);
  }

  find(predicate: Predicate) {
    return this._select.find(predicate);
  }

  async add(payload: ArtifactPayload) {
    await addArtifact(payload, this._driver);
  }

  async edit(payload: ArtifactPayloadWithId) {
    await editArtifact(payload, this._driver);
  }

  async del(ideable: Ideable) {
    const from = {
      artifacts: this._select.filter().value,
      driver: this._driver,
    };

    await delArtifact(ideable, from);
  }
}
