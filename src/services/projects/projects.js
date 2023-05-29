import { Stateful } from "../../utils";
import { Project } from "./project";

export class Projects extends Stateful {
  #projects = new Map();

  add({ name }) {
    const project = new Project({ name });
    this.#projects.set(project.id, project);
    this.notify();
    return project;
  }

  get(id) {
    return this.#projects.get(id);
  }

  list() {
    return Array.from(this.#projects.values());
  }

  update(id, { name }) {
    const project = this.get(id);
    project.name = name;
    this.notify();
  }
}
