import { Project } from "./project";

export class Projects {
  #projects = new Map();

  add({ name }) {
    const project = new Project({ name });
    this.#projects.set(project.id, project);
    return project;
  }

  get(id) {
    return this.#projects.get(id);
  }
}
