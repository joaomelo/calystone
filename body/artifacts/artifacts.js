export class Artifacts {
  findArtifactWithId(id) {
    return this.listArtifacts().find((artifact) => artifact.id === id);
  }

  edit(artifactData) {
    return this._artifactsDataset.set(artifactData);
  }

  archive(programId) {
    return this._artifactsDataset.set({
      id: programId,
      archivedAt: new Date(),
    });
  }

  unarchive(programId) {
    return this._artifactsDataset.set({
      id: programId,
      archivedAt: null,
    });
  }

  delete(programId) {
    return this._artifactsDataset.del(programId);
  }
}

export class Programs {
  findProgramWithId(id) {
    return this.listPrograms().find((program) => program.id === id);
  }

  edit(programData) {
    return this._programsDataset.set(programData);
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
