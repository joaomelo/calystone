import { Select } from "@lib";

export class Artifacts extends Select {
  constructor(driver) {
    super("artifacts", driver);
  }
}
