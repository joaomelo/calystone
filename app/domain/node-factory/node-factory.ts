import type { NodeOptions } from "../node";

import { BinaryArtifact, isArtifactDataOptions, Mime, TextArtifact } from "../artifact";
import { Directory } from "../directory";

export function createNode(options: NodeOptions): BinaryArtifact | Directory | TextArtifact {
  if (isArtifactDataOptions(options)) {
    const mime = new Mime(options.name);
    if (mime.type() === "text") {
      return new TextArtifact(options);
    }
    return new BinaryArtifact(options);
  }
  return new Directory(options);
}