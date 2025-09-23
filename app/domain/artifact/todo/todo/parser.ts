import {
  isCriteria,
  Prioritizer
} from "@/domain/artifact/todo/prioritizer";
import { Progressor } from "@/domain/artifact/todo/progressor";
import {
  Reference,
  Scheduler,
  Step,
  Unit
} from "@/domain/schedule";
import { Tagger } from "@/domain/tagger";
import {
  isJsonParseable,
  isObjectLike
} from "@/utils";

import type { TodoArtifactState } from "./state";

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
      scheduler: new Scheduler(),
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

    if ("criteria" in rawData && isCriteria(rawData.criteria)) {
      data.prioritizer.patch(rawData.criteria);
    }

    if (
      "dateStart" in rawData
      && typeof rawData.dateStart === "string"
      && "dateDue" in rawData
      && typeof rawData.dateDue === "string"
    ) {
      const start = new Date(rawData.dateStart);
      const end = new Date(rawData.dateDue);
      data.scheduler.updateDates({
        end,
        start
      });
    }

    if (
      "recurrenceReference" in rawData
      && Reference.isValue(rawData.recurrenceReference)
      && "recurrenceStep" in rawData
      && Step.isValue(rawData.recurrenceStep)
      && "recurrenceUnit" in rawData
      && Unit.isValue(rawData.recurrenceUnit)
    ) {
      data.scheduler.updateRecurrence({
        reference: rawData.recurrenceReference,
        step: rawData.recurrenceStep,
        unit: rawData.recurrenceUnit
      });
    }

    if ("tags" in rawData && Array.isArray(rawData.tags)) {
      data.tagger.add(rawData.tags);
    }

    return data;
  }

  private stringifyDate(date?: Date): string | undefined {
    if (!date) {
      return undefined;
    }
    return date.toISOString();
  }

  convertDataToBinary(data: TodoArtifactState): ArrayBuffer {
    const {
      end: endDate,
      reference,
      start: startDate,
      step,
      unit
    } = data.scheduler;

    const startString = this.stringifyDate(startDate);
    const endString = this.stringifyDate(endDate);

    const jsonString = JSON.stringify({
      criteria: data.prioritizer.criteria(),
      dateDue: endString,
      dateStart: startString,
      details: data.details,
      progress: data.progressor.progress,
      recurrenceReference: reference,
      recurrenceStep: step,
      recurrenceUnit: unit,
      tags: data.tagger.labels(),
      version: Parser.VERSION,
    });

    return this.encoder.encode(jsonString).buffer as ArrayBuffer;
  }
}
