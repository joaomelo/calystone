import { add } from "./add";
import { del } from "./del";
import { put } from "./put";

export class Mutator {
  name;
  driver;

  constructor(name, driver) {
    this.name = name;
    this.driver = driver;
  }

  add(payload) {
    return add({ payload, name: this.name, driver: this.driver });
  }

  put(payload) {
    return put({ payload, name: this.name, driver: this.driver });
  }

  del(idOrIds) {
    return del({ idOrIds, name: this.name, driver: this.driver });
  }
}
