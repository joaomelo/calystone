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

  basename(): string {
    const name = this.name;
    if (!name) return "";

    const lastDotIndex = name.lastIndexOf(".");
    if (lastDotIndex === -1) return name;

    return name.substring(0, lastDotIndex);
  }

  fromBinary(binary: ArrayBuffer): void {
    this.performFromBinary(binary);
    this.load();
  }

  nameWithoutExtension(): string {
    const name = this.name;
    if (!name) return "";

    const lastDotIndex = name.lastIndexOf(".");
    if (lastDotIndex === -1) return name;

    return name.substring(0, lastDotIndex);
  }

  parentable(): Status {
    return Status.fail("ARTIFACT_CANNOT_BE_PARENT");
  }

  abstract toBinary(): ArrayBuffer;

  protected abstract performFromBinary(binary: ArrayBuffer): void;
}
