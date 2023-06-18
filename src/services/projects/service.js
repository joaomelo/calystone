import { Stateful } from "../../lib";
import { Projects } from "../../domain";

export class ProjectsService extends Stateful {
  _projects = new Projects();
  _auth;

  constructor(auth) {
    super();
    this._auth = auth;
  }

  get(id) {
    return this._projects.get(id);
  }

  list() {
    return this._projects.list();
  }

  add(payload) {
    const owner = this._auth.userId;
    this._projects.add({ owner, ...payload });
    this.notify();
  }

  set(payload) {
    this._projects.set(payload);
    this.notify();
  }

  archive(payload) {
    this._projects.archive(payload);
    this.notify();
  }

  delete(payload) {
    this._projects.delete(payload);
    this.notify();
  }
}
