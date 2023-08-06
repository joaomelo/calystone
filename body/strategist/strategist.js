import { Stateful } from "../../lib";

export class Strategist extends Stateful {
  _programs;
  _shepherd;
  _gatekeeper;

  constructor({ programs, shepherd, gatekeeper }) {
    super();
    this._shepherd = shepherd;
    this._gatekeeper = gatekeeper;
    this._programs = programs;

    this._programs.subscribe(() => this.notify());
  }

  listPrograms() {
    const items = this._programs.list().map((rawItem) => {
      const { usersIds, ...rest } = rawItem;
      const users = usersIds.map((userId) =>
        this._shepherd.findUserWithId(userId)
      );
      return {
        ...rest,
        users,
      };
    });
    return items;
  }

  listCurrentUserPrograms() {
    return this.listPrograms().filter((item) =>
      item.users.find((user) => user.id === this._gatekeeper.userId)
    );
  }

  findProgramWithId(id) {
    return this._programs.findWithId(id);
  }

  addProgram({ name }) {
    const payloadWithUser = {
      name,
      archivedAt: null,
      usersIds: [this._gatekeeper.userId],
    };
    return this._programs.add(payloadWithUser);
  }

  editProgram(payload) {
    return this._programs.set(payload);
  }

  archiveProgram(id) {
    this._programs.set({
      id,
      archivedAt: new Date(),
    });
  }

  unarchiveProgram(id) {
    this._programs.set({
      id,
      archivedAt: null,
    });
  }
}
