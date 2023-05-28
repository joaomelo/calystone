import { v4 as uuid } from "uuid";

export class Project {
  id;
  name;

  constructor({ id, name }) {
    this.id = id || uuid();
    this.name = name;
  }
}
