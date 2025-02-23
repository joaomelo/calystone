import { Node } from "@/domain/node";

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
}
