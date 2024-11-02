import type { Artifact } from "@/domain/artifact";
import type { Source } from "@/domain/source";
import type { Id } from "@/utils";
import type { Ref } from "vue";

import { ref } from "vue";

export class Artifacts {
  async load(source: Source) {
    this.isLoading.value = true;

    this.close();
    this.source.value = source;

    for await (const artifact of source.load()) {
      this.index.value.set(artifact.id, artifact);
      if (!artifact.parent) {
        this.roots.value.push(artifact);
      }
    }

    this.isLoading.value = false;
  }
}