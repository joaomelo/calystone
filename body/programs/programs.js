import { Stateful } from "../../lib";
import { Program } from "./program";

export class Programs extends Stateful {
  _auth;
  _programsDataset;
  _programs = [];

  constructor(service) {
    super();

    this._auth = service.auth;
    this._programsDataset = service.data.programs;

    service.select(["programs", "users"], ([programsData, usersData]) => {
      if (!programsData || !usersData) {
        this._programs = [];
        this.notify();
        return;
      }

      this._programs = programsData.map(({ id: programId }) =>
        Program.mount({ programId, programsData, usersData })
      );
      this.notify();
    });
  }

  listPrograms() {
    return this._programs;
  }

  listProgramsOfUser(userId) {
    return this.listPrograms().filter((program) =>
      program.users.find((user) => user.id === userId)
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

  edit(payload) {
    return this._programsDataset.set(payload);
  }

  archive(programId) {
    return this._programsDataset.set({
      id: programId,
      archivedAt: new Date(),
    });
  }

  unarchive(programId) {
    return this._programsDataset.set({
      id: programId,
      archivedAt: null,
    });
  }
}
