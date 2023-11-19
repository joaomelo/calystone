import { Mutator, Select, Auth } from "@lib";
import { Artifacts, Gate } from "@body";
import { key } from "./key";

export class Body {
  artifacts;
  gate;

  constructor(driver) {
    const auth = new Auth(driver);
    const gate = new Gate({ auth });
    this.gate = gate;

    const select = new Select("artifacts", driver);
    const mutator = new Mutator("artifacts", driver);
    const artifacts = new Artifacts({ select, mutator, gate });
    this.artifacts = artifacts;

    gate.artifacts = artifacts;
  }

  install(app) {
    app.provide(key, this);
  }
}
