import { Stateful } from "../../lib";
import { Artifact } from "./artifact";

export class Tactician extends Stateful {
  _artifactsDataset;
  _artifacts = [];

  constructor(service) {
    super();

    this._artifactsDataset = service.data.artifacts;

    this._artifactsDataset.subscribe((artifactsData) => {
      this._artifacts = service.loadedOnce
        ? artifactsData.map(({ id }) => new Artifact({ id, service }))
        : [];
      this.notify();
    });
  }

  listArtifacts() {
    return this._artifacts;
  }

  listArtifactsOfProgram(programId) {
    return this._artifacts.filter((artifact) => artifact.isOf(programId));
  }

  artifact({ programId, name }) {
    if (!programId) throw new Error("NO_REQUIRED_PROGRAM_ID");
    if (!name) throw new Error("NO_REQUIRED_NAME");

    return this._artifactsDataset.add({ programId, name });
  }
}
