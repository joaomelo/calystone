export class Projects {
  _projects = new Map();

  get(id) {
    return this._projects.get(id);
  }

  list() {
    return Array.from(this._projects.values());
  }

  set(project) {
    this._projects.set(project.id, project);
  }

  delete(id) {
    this._projects.delete(id);
  }
}
