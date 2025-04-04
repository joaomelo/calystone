import type { ArtifactOptions } from "../artifact";
import type { DirectoryOptions } from "../directory";
import type { NodeOptions } from "../node";

import { BinaryArtifact, isArtifactDataOptions, Mime, TextArtifact } from "../artifact";
import { Directory } from "../directory";

export function createNode(options: ArtifactOptions): BinaryArtifact | TextArtifact;
export function createNode(options: DirectoryOptions): Directory;

export function createNode(options: NodeOptions): BinaryArtifact | Directory | TextArtifact {
  if (isArtifactDataOptions(options)) {
    return createArtifact(options);
  }
  return new Directory(options);
}

function createArtifact(options: ArtifactOptions): BinaryArtifact | TextArtifact {
  const mime = new Mime(options.name);
  if (mime.type() === "text") {
    return new TextArtifact(options);
  }
  return new BinaryArtifact(options);
}
