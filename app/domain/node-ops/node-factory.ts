import type {
  Artifact,
  ArtifactOptions
} from "../artifact";
import type { DirectoryOptions } from "../directory";
import type { NodeOptions } from "../node";

import {
  BinaryArtifact,
  isArtifactOptions,
  Mime,
  TextArtifact,
  TodoArtifact
} from "../artifact";
import { Directory } from "../directory";

export function createNode(options: ArtifactOptions): Artifact;
export function createNode(options: DirectoryOptions): Directory;

export function createNode(options: NodeOptions): Artifact | Directory {
  if (isArtifactOptions(options)) {
    return createArtifact(options);
  }
  return new Directory(options);
}

function createArtifact(options: ArtifactOptions): Artifact {
  const mime = new Mime(options.name);

  if (mime.media() === "application/todo") {
    return new TodoArtifact(options);
  }

  if (mime.type() === "text") {
    return new TextArtifact(options);
  }

  return new BinaryArtifact(options);
}
