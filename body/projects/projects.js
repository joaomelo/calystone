import { v4 as uuid } from "uuid";
import { Stateful } from "../stateful";
import { Project } from "./project";

export class Projects extends Stateful {
  _projects = new Map();
  _auth;
  _engine;

  constructor({ auth, engine }) {
    super();
    this._auth = auth;
    this._auth.subscribe(() => this.link());
    this._engine = engine;
  }

  link() {
    if (!this._auth.signedIn) {
      this._projects.clear();
      this.notify();
      return;
    }

    const query = this._engine.where("OWNER", "===", this._auth.userId);
    query.onSnapshot((snapshot) => {
      snapshot;
    });

    // active listener to database tied to this user
    this.notify();
  }

  get(id) {
    return this._projects.get(id);
  }

  list() {
    return Array.from(this._projects.values());
  }

  add(payload) {
    const owner = this._auth.userId;
    const id = uuid();
    this.set({ owner, id, ...payload });
  }

  set(payload) {
    this._projects.set(project.id, project);
    this.notify();
  }

  delete(id) {
    this._projects.delete(id);
    this.notify();
  }
}
