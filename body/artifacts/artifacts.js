import { Stateful } from "../../lib";
import { Artifact } from "./artifact";

export class Artifacts extends Stateful {
  _artifactsDataset;
  _artifacts = [];

  constructor(service) {
    super();

    this._artifactsDataset = service.data.artifacts;

    this._artifactsDataset.subscribe((artifactsData) => {
      if (!artifactsData) {
        this._artifacts = [];
        this.notify();
        return;
      }

      this._artifacts = artifactsData.map(({ id: artifactId }) =>
        Artifact.mount({ artifactId, artifactsData })
      );
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
