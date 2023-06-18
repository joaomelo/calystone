import { Project } from "./project";

export class Projects {
  #projects = new Map();

  get(id) {
    return this.#projects.get(id);
  }

  list() {
    return Array.from(this.#projects.values());
  }

  add({ name, owner }) {
    const project = new Project({ name, owner });
    this.#projects.set(project.id, project);
  }

  set({ id, name }) {
    const project = this.get(id);
    project.name = name;
  }

  archive(id) {
    const project = this.get(id);
    project.archive();
  }

  delete(id) {
    this.#projects.delete(id);
  }
}
