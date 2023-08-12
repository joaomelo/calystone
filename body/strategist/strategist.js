export class Strategist {
  _gatekeeper;
  _programsDataset;

  constructor({ gatekeeper, programsDataset }) {
    this._gatekeeper = gatekeeper;
    this._programsDataset = programsDataset;
  }

  addProgram({ name }) {
    const payloadWithUser = {
      name,
      archivedAt: null,
      usersIds: [this._gatekeeper.userId],
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
