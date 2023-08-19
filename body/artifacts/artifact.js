export class Artifact {
  _artifactsDataset;

  _id;
  _name;
  _programId;

  constructor({ id, service }) {
    this._artifactsDataset = service.data.artifacts;

    const { name, programId } = this._artifactsDataset.findWithId(id);

    this._id = id;
    this._name = name;
    this._programId = programId;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get programId() {
    return this._programId;
  }

  isOf(programId) {
    return this.programId === programId;
  }
}
