import { type Artifact } from "@/domain/artifact";
import { type Source } from "@/domain/source";
import { type Id } from "@/utils";
import { reactive, ref } from "vue";

export class Artifacts {
  public readonly hash = reactive(new Map<Id, Artifact>());
  public readonly source = ref<Source | undefined>();

  close(): void {
    this.source.value = undefined;
    this.hash.clear();
  }

  async stream(source: Source) {
    this.close();
    this.source.value = source;
    
    for await (const artifact of source.load()) {
      this.hash.set(artifact.id, artifact);
    }
  }
}