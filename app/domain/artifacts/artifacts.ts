import { type Artifact } from "@/domain/artifact";
import { type Id } from "@/domain/ids";
import { type Source } from "@/domain/source";
import { type Reactive, reactive } from "vue";

export class Artifacts {
  private source?: Source;
  public readonly hash: Reactive<Map<Id, Artifact>>;

  constructor() {
    this.hash = reactive(new Map<Id, Artifact>());
  }

  close(): void {
    this.source = undefined;
    this.hash.clear();
  }

  async stream(source: Source) {
    this.close();
    this.source = source;
    
    for await (const artifact of source.load()) {
      this.hash.set(artifact.id, artifact);
    }
  }

  get hasSource() {
    return !!this.source;
  }
}