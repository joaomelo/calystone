export class Artifact {
  _id;
  _name;
  _programId;

  static mount({ artifactId, artifactsData }) {
    const artifactData = artifactsData.find(({ id }) => id === artifactId);
    return new Artifact(artifactData);
  }

  constructor({ id, name, programId }) {
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
