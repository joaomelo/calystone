import { Program } from "../programs";

export class Artifact {
  _id;
  _name;
  _notes;
  _program;
  _archivedAt;

  static mount({ artifactId, artifactsData, programsData, usersData }) {
    const { programId, ...artifactData } = artifactsData.find(
      ({ id }) => id === artifactId
    );
    const program = Program.mount({ programId, programsData, usersData });
    return new Artifact({ program, ...artifactData });
  }

  constructor({ id, name, notes, program, archivedAt }) {
    this._id = id;
    this._name = name;
    this._notes = notes;
    this._program = program;
    this._archivedAt = archivedAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get notes() {
    return this._notes;
  }

  get program() {
    return this._program;
  }

  get programId() {
    return this._program.id;
  }

  get archivedAt() {
    return this._archivedAt;
  }

  get isArchived() {
    return !!this._archivedAt;
  }

  isOf(programId) {
    return this.programId === programId;
  }
}
