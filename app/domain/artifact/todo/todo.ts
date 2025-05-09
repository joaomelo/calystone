import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";

import { Artifact } from "../artifact";
import { Dater } from "./dater";
import { Parser } from "./parser";
import { Prioritizer } from "./prioritizer";
import { Progressor } from "./progressor";
import { Tagger } from "./tagger";

export class TodoArtifact extends Artifact {
  dater = new Dater();
  details = "";
  parser = new Parser();
  prioritizer = new Prioritizer();
  progressor = new Progressor();
  tagger = new Tagger();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
  }

  performFromBinary(binary: ArrayBuffer): void {
    const data = this.parser.convertBinaryToData(binary);
    this.details = data.details;
    this.progressor = data.progressor;
    this.prioritizer = data.prioritizer;
    this.dater = data.dater;
    this.tagger = data.tagger;
  }

  toBinary(): ArrayBuffer {
    return this.parser.convertDataToBinary({
      dater: this.dater,
      details: this.details,
      prioritizer: this.prioritizer,
      progressor: this.progressor,
      tagger: this.tagger,
    });
  }
}
