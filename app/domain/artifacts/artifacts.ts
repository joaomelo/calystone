import type { Artifact } from "@/domain/artifact";
import type { Source } from "@/domain/source";
import type { Id } from "@/utils";

export class Artifacts {
  public readonly index = new Map<Id, Artifact>();
  public isLoading = false;
  public readonly roots: Artifact[] = [];
  public source: Source | undefined;

  close(): void {
    this.source = undefined;
    this.roots.length = 0;
    this.index.clear();
  }

  async load(source: Source) {
    this.isLoading = true;

    this.close();
    this.source = source;

    for await (const artifact of source.load()) {
      this.index.set(artifact.id, artifact);
      if (!artifact.parent) {
        this.roots.push(artifact);
      }
    }

    this.isLoading = false;
  }
}