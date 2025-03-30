import { Node } from "@/domain/node";
import { Status } from "@/utils";

import type { ArtifactOptions } from "./options";

import { Mime } from "../mime";

export class Artifact extends Node {
  content?: ArrayBuffer;
  lastModified: number;
  readonly mime: Mime;
  size: number;

  constructor({ lastModified, size, ...options }: ArtifactOptions) {
    super(options);
    this.lastModified = lastModified;
    this.size = size;
    this.mime = new Mime(options.name);
  }

  parentable(): Status {
    return Status.fail("ARTIFACT_CANNOT_BE_PARENT");
  }
}
