import { type Artifact } from "@data/artifacts";

export abstract class Source {
  protected artifacts: Artifact[] = [];

  list(): Artifact[] {
    return this.artifacts;
  }

  abstract refresh(): Promise<void>;
}