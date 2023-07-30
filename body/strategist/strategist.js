import { StatefulRepository } from "../../lib";

export class Strategist extends StatefulRepository {
  _programs;
  _shepherd;
  _gatekeeper;

  constructor({ programs, shepherd, gatekeeper }) {
    super();
    this._shepherd = shepherd;
    this._gatekeeper = gatekeeper;

    this._programs = programs;
    this._programs.subscribe((rawItems) => {
      const items = rawItems.map((rawItem) => {
        const { usersIds, ...rest } = rawItem;
        const users = usersIds.map((userId) => this._shepherd.findById(userId));
        return {
          ...rest,
          users,
        };
      });
      this.load(items);
    });
  }

  listMine() {
    return this.filter((item) =>
      item.users.find((user) => user.id === this._gatekeeper.userId)
    );
  }

  addProgram({ name }) {
    const payloadWithUser = {
      name,
      archivedAt: null,
      usersIds: [this._gatekeeper.userId],
    };
    return this._programs.add(payloadWithUser);
  }

  edit(payload) {
    return this._programs.set(payload);
  }

  archive(id) {
    this._programs.set({
      id,
      archivedAt: new Date(),
    });
  }

  unarchive(id) {
    this._programs.set({
      id,
      archivedAt: null,
    });
  }
}
