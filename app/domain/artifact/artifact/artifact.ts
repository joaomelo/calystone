import { Node } from "@/domain/node";
import { Status } from "@/utils";

import type { ArtifactOptions } from "./options";

import { Mime } from "../mime";

export abstract class Artifact extends Node {
  lastModified: number;
  readonly mime: Mime;
  size: number;

  constructor({ lastModified, size, ...options }: ArtifactOptions) {
    super(options);
    this.lastModified = lastModified;
    this.size = size;
    this.mime = new Mime(options.name);
  }

  fromBinary(binary: ArrayBuffer): void {
    this.performFromBinary(binary);
    this.load();
  }

  parentable(): Status {
    return Status.fail("ARTIFACT_CANNOT_BE_PARENT");
  }

  abstract toBinary(): ArrayBuffer;

  protected abstract performFromBinary(binary: ArrayBuffer): void;
}
