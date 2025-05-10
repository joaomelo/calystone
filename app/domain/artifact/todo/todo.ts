import type { RecurrerOptions } from "@/domain/artifact/recurrer";

import { Recurrer } from "@/domain/artifact/recurrer";
import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { TodoArtifactState } from "./state";

import { Artifact } from "../artifact";
import { Dater } from "./dater";
import { Parser } from "./parser";
import { Prioritizer } from "./prioritizer";
import { Progressor } from "./progressor";
import { Tagger } from "./tagger";

export class TodoArtifact extends Artifact implements TodoArtifactState {
  dater? = new Dater();
  details = "";
  parser = new Parser();
  prioritizer = new Prioritizer();
  progressor = new Progressor();
  recurrer?: Recurrer;
  tagger = new Tagger();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
  }

  clearDates() {
    this.dater = undefined;
    this.disableRecurrence();
  }

  dateDue() {
    return this.dater?.due;
  }

  dateStart() {
    return this.dater?.start;
  }

  disableRecurrence() {
    this.recurrer = undefined;
  }

  enableRecurrence(options: RecurrerOptions = {}) {
    this.recurrer = new Recurrer(options);
  }

  performFromBinary(binary: ArrayBuffer): void {
    const data = this.parser.convertBinaryToState(binary);
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
      recurrer: this.recurrer,
      tagger: this.tagger,
    });
  }
}
