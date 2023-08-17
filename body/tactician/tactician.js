export class Tactician {
  _shepherd;
  _artifactsDataset;

  constructor({ programsDataset }) {
    this._artifactsDataset = programsDataset;
  }

  addArtifact({ programId, name }) {
    if (!programId) throw new Error("NO_REQUIRED_PROGRAM_ID");
    if (!name) throw new Error("NO_REQUIRED_NAME");

    const payload = {
      programId,
      name,
    };
    return this._artifactsDataset.add(payload);
  }
}
