import { type Artifact } from "@/domain/artifact";
import { type Source } from "@/domain/source";
import { type Id } from "@/utils";

export class Artifacts {
  public readonly hash = new Map<Id, Artifact>();
  public isLoading = false;
  public source: Source | undefined;

  close(): void {
    this.source = undefined;
    this.hash.clear();
  }

  async load(source: Source) {
    this.isLoading = true;

    this.close();
    this.source = source;

    for await (const artifact of source.load()) {
      this.hash.set(artifact.id, artifact);
    }

    this.isLoading = false;
  }
}