import { Stateful } from "../stateful";
import { Project } from "./project";
export class Projects extends Stateful {
  _projects = new Map();
  _users;

  constructor({ users }) {
    super();
    this._users = users;
  }

  get(id) {
    return this._projects.get(id);
  }

  list() {
    return Array.from(this._projects.values());
  }

  add(payload) {
    const owner = this._users.current;
    const project = new Project({ owner, ...payload });
    this.set(project);
  }

  set(project) {
    this._projects.set(project.id, project);
    this.notify();
  }

  delete(id) {
    this._projects.delete(id);
    this.notify();
  }
}
