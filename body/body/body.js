import { Mutator, Select } from "@lib";
import { Artifacts } from "../artifacts";
import { Gate } from "../gate";
import { key } from "./key";

export class Body {
  artifacts;
  gate;

  constructor({ mutatorAdapter, selectAdapter, auth }) {
    const gate = new Gate({ auth });
    this.gate = gate;

    const mutator = new Mutator("artifacts", mutatorAdapter);
    const select = new Select("artifacts", selectAdapter);
    const artifacts = new Artifacts({ select, mutator, gate });
    this.artifactsSelect = select;
    this.artifacts = artifacts;

    gate.artifacts = artifacts;
  }

  install(app) {
    app.provide(key, this);
  }
}
