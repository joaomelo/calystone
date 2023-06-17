import { Stateful } from "../../lib";
import { Project } from "./project";

export class Projects extends Stateful {
  #projects = new Map();

  get(id) {
    return this.#projects.get(id);
  }

  list() {
    return Array.from(this.#projects.values());
  }

  add({ name }) {
    const project = new Project({ name });
    this.#projects.set(project.id, project);
    this.notify();
    return project;
  }

  set({ id, name }) {
    const project = this.get(id);
    project.name = name;
    this.notify();
    return project;
  }

  archive(id) {
    const project = this.get(id);
    this.notify();
    project.archive();
    return project;
  }

  delete(id) {
    const project = this.get(id);
    this.#projects.delete(id);
    console.log({ id, v: this.#projects });
    this.notify();
    return project;
  }
}
