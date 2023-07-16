import { StatefulRepository } from "../../lib";

export class Strategist extends StatefulRepository {
  _programs;
  _shepherd;

  constructor({ programs, shepherd }) {
    super();
    this._shepherd = shepherd;
    this._programs = programs;
    this._programs.subscribe((items) => this.load(items));
  }

  communityOf(id) {
    const program = this.get(id);
    if (!program) return [];

    const community = program.community.map((userId) =>
      this._shepherd.get(userId)
    );
    return community;
  }

  program(payload) {
    const payloadWithUser = {
      ...payload,
      users: [this._auth.userId],
    };
    return this._programs.add(payloadWithUser);
  }

  edit(payload) {
    const program = this.get(payload.id);
    return this._programs.set({
      ...program,
      ...payload,
    });
  }

  archive(id) {
    const program = this.get(id);
    return this._programs.set({
      ...program,
      archivedAt: new Date(),
    });
  }
}