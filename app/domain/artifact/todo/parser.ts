import { isJsonParseable, isObjectLike } from "@/utils";

import { Dater } from "./dater";
import { Prioritizer } from "./prioritizer";
import { Progressor } from "./progressor";
import { Tagger } from "./tagger";

interface Data {
  details: string,
  prioritizer: Prioritizer,
  progressor: Progressor,
  dater: Dater,
  tagger: Tagger,
}

export class Parser {
  static readonly VERSION = 1;

  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();

  convertBinaryToData(binary: ArrayBuffer): Data {
    const flatJsonString = this.decoder.decode(binary);

    const data: Data = {
      dater: new Dater(),
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

    if ("details" in data && typeof rawData.details === "string") {
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

    if ("startDate" in data && typeof rawData.startDate === "string") {
      const startDate = new Date(rawData.startDate);
      data.dater.updateStart({ anchor: false, date: startDate });
    }

    if ("dueDate" in data && typeof rawData.dueDate === "string") {
      const dueDate = new Date(rawData.dueDate);
      data.dater.updateDue({ anchor: false, date: dueDate });
    }

    if ("tags" in data && Array.isArray(rawData.tags)) {
      data.tagger.add(rawData.tags);
    }

    return data;
  }

  convertDataToBinary(data: Data): ArrayBuffer {
    const { due, start } = data.dater.stringify();
    const jsonString = JSON.stringify({
      details: data.details,
      dueDate: due,
      importance: data.prioritizer.importance,
      progress: data.progressor.progress,
      startDate: start,
      tags: data.tagger.list(),
      urgency: data.prioritizer.urgency,
      version: Parser.VERSION,
    });
    return this.encoder.encode(jsonString).buffer as ArrayBuffer;
  }
}
