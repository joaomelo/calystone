import type { Driver } from "@service";
import type { Artifact } from "../artifact";

import { Select } from "@service";

export class ArtifactsSelect extends Select<Artifact> {
  constructor(driver: Driver) {
    super("artifacts", driver);
  }
}
