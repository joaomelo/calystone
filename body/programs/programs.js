import { Stateful } from "../../lib";
import { Program } from "./program";

export class Strategist extends Stateful {
  _auth;
  _programsDataset;
  _programs = [];

  constructor(service) {
    super();

    this._auth = service.auth;
    this._programsDataset = service.data.programs;

    this._programsDataset.subscribe((programsData) => {
      this._programs = service.loadedOnce
        ? programsData.map(({ id }) => new Program({ id, service }))
        : [];
      this.notify();
    });
  }

  listPrograms() {
    return this._programs;
  }

  listProgramsOfUser(userId) {
    return this.listPrograms().filter((item) =>
      item.users.find((user) => user.id === userId)
    );
  }

  listProgramsOfCurrentUser() {
    return this.listProgramsOfUser(this.userId);
  }

  findProgramWithId(id) {
    return this.listPrograms().find((program) => program.id === id);
  }

  program({ name }) {
    const payloadWithUser = {
      name,
      archivedAt: null,
      usersIds: [this._auth.userId],
    };
    return this._programsDataset.add(payloadWithUser);
  }
}
