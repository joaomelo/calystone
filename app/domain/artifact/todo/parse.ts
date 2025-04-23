import { isJsonParseable, isObjectLike } from "@/utils";

import type { Progress } from "./progress";

import { isProgress } from "./progress";

interface Data {
  details?: string;
  importance?: number;
  progress?: Progress;
  startDate?: Date;
  dueDate?: Date;
  urgency?: number;
}

export function parseString(value: string): Data {
  const data: Data = {
    details: undefined,
    dueDate: undefined,
    importance: undefined,
    progress: undefined,
    startDate: undefined,
    urgency: undefined,
  };

  if (!isJsonParseable(value)) {
    return data;
  };

  const rawData = JSON.parse(value) as Record<string, unknown>;
  if (!isObjectLike(rawData)) {
    return data;
  }

  if (("progress" in rawData) && isProgress(rawData.progress)) {
    data.progress = rawData.progress;
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

  if ("startDate" in data && typeof rawData.startDate === "string") {
    data.startDate = new Date(rawData.startDate);
  }

  if ("dueDate" in data && typeof rawData.dueDate === "string") {
    data.dueDate = new Date(rawData.dueDate);
  }

  return data;
}

export function stringifyData(data: Data): string {
  return JSON.stringify({
    details: data.details,
    dueDate: data.dueDate?.toISOString() ?? null,
    importance: data.importance,
    progress: data.progress,
    startDate: data.startDate?.toISOString() ?? null,
    urgency: data.urgency
  });
}