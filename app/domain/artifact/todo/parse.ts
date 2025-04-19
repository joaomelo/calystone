import { isJsonParseable, isObjectLike } from "@/utils";

import type { Mode } from "./mode";

import { isMode } from "./mode";

interface Data {
  details?: string;
  importance?: number;
  mode?: Mode;
  urgency?: number;
}

export function parseJsonString(value: string): Data {
  const data: Data = {
    details: undefined,
    importance: undefined,
    mode: undefined,
    urgency: undefined,
  };

  if (!isJsonParseable(value)) {
    return data;
  };

  const rawData = JSON.parse(value) as Record<string, unknown>;
  if (!isObjectLike(rawData)) {
    return data;
  }

  if (("mode" in rawData) && isMode(rawData.mode)) {
    data.mode = rawData.mode;
  }

  if ("details" in data && typeof rawData.details === "string") {
    data.details = rawData.details;
  }

  if ("importance" in data && typeof rawData.importance === "number") {
    data.importance = rawData.importance;
  }

  if ("urgency" in data && typeof rawData.urgency === "number") {
    data.urgency = rawData.urgency;
  }

  return data;
}