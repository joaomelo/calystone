import { Dater } from "@/domain/artifact/dater";
import { isJsonParseable, isObjectLike } from "@/utils";

import type { TodoArtifactState } from "./state";

import { RecurrenceReference, RecurrenceStep, RecurrenceUnit, Recurrer } from "../recurrer";
import { Prioritizer } from "./prioritizer";
import { Progressor } from "./progressor";
import { Tagger } from "./tagger";

export class Parser {
  static readonly VERSION = 1;

  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();

  convertBinaryToState(binary: ArrayBuffer): TodoArtifactState {
    const flatJsonString = this.decoder.decode(binary);

    const data: TodoArtifactState = {
      details: "",
      prioritizer: new Prioritizer(),
      progressor: new Progressor(),
      tagger: new Tagger(),
    };

    if (!isJsonParseable(flatJsonString)) {
      return data;
    };

    const rawData = JSON.parse(flatJsonString) as Record<string, unknown>;
    if (!isObjectLike(rawData)) {
      return data;
    }

    if (!("version" in rawData) || typeof rawData.version !== "number") {
      return data;
    }

    if (rawData.version !== Parser.VERSION) {
      return data;
    }

    if ("details" in rawData && typeof rawData.details === "string") {
      data.details = rawData.details;
    }

    if (("progress" in rawData) && Progressor.isProgress(rawData.progress)) {
      data.progressor = new Progressor(rawData.progress);
    }

    if ("importance" in rawData && typeof rawData.importance === "number") {
      data.prioritizer.importance = rawData.importance;
    }

    if ("urgency" in rawData && typeof rawData.urgency === "number") {
      data.prioritizer.urgency = rawData.urgency;
    }

    if (
      "dateStart" in rawData
      && typeof rawData.dateStart === "string"
      && "dateDue" in rawData
      && typeof rawData.dateDue === "string"
    ) {
      const start = new Date(rawData.dateStart);
      const due = new Date(rawData.dateDue);
      const dater = new Dater({ allDay: false, due, start });
      data.dater = dater;
    }

    if (
      "recurrenceReference" in rawData
      && RecurrenceReference.isRecurrenceReferenceValue(rawData.recurrenceReference)
      && "recurrenceStep" in rawData
      && RecurrenceStep.isStepValue(rawData.recurrenceStep)
      && "recurrenceUnit" in rawData
      && RecurrenceUnit.isRecurrenceUnitValue(rawData.recurrenceUnit)
    ) {
      const recurrer = new Recurrer({ reference: rawData.recurrenceReference, step: rawData.recurrenceStep, unit: rawData.recurrenceUnit });
      data.recurrer = recurrer;
    }

    if ("tags" in rawData && Array.isArray(rawData.tags)) {
      data.tagger.add(rawData.tags);
    }

    return data;
  }

  convertDataToBinary(data: TodoArtifactState): ArrayBuffer {
    const { due, start } = data.dater?.stringify() ?? {};
    const { reference, step, unit } = data.recurrer?.stringify() ?? {};

    const jsonString = JSON.stringify({
      dateDue: due,
      dateStart: start,
      details: data.details,
      importance: data.prioritizer.importance,
      progress: data.progressor.progress,
      recurrenceReference: reference,
      recurrenceStep: step,
      recurrenceUnit: unit,
      tags: data.tagger.list(),
      urgency: data.prioritizer.urgency,
      version: Parser.VERSION,
    });
    return this.encoder.encode(jsonString).buffer as ArrayBuffer;
  }
}
