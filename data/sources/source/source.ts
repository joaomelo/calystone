import { type Artifact } from "@data/artifacts";

export abstract class Source {
  protected artifacts: Artifact[] = [];

  list(): Artifact[] {
    return this.artifacts;
  }

  replace(artifacts: Artifact[]) {
    this.artifacts = artifacts;
  }

  abstract refresh(): Promise<void>;
}