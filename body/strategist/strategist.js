export class Strategist {
  _shepherd;
  _programsDataset;

  constructor({ shepherd, programsDataset }) {
    this._shepherd = shepherd;
    this._programsDataset = programsDataset;
  }

  addProgram({ name }) {
    const payloadWithUser = {
      name,
      archivedAt: null,
      usersIds: [this._shepherd.userId],
    };
    return this._programsDataset.add(payloadWithUser);
  }

  editProgram(payload) {
    return this._programsDataset.set(payload);
  }

  archiveProgram(id) {
    this._programsDataset.set({
      id,
      archivedAt: new Date(),
    });
  }

  unarchiveProgram(id) {
    this._programsDataset.set({
      id,
      archivedAt: null,
    });
  }
}
