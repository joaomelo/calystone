import { Node } from "@/domain/node";

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

  sizeAbove(bytes: number): boolean {
    return this.size > bytes;
  }

  sizeBelow(bytes: number): boolean {
    return this.size < bytes;
  }

  sizeBetween(options: { max: number; min: number, }): boolean {
    return this.size >= options.min && this.size <= options.max;
  }

  abstract toBinary(): ArrayBuffer;

  protected abstract performFromBinary(binary: ArrayBuffer): void;
}
