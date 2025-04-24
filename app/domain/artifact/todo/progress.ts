import { throwError } from "@/utils";

export type Progress = (typeof progresses)[number];

const progresses = ["done", "open", "skipped" ] as const;
const defaultProgress: Progress = "open";

export class Progressor {
  progress: Progress;

  constructor(progress: Progress = defaultProgress) {
    this.progress = progress;
  }

  completed() {
    return this.progress === "done" || this.progress === "skipped";
  }

  done() {
    if (this.completed()) {
      throwError("CANNOT_DONE_WHEN_COMPLETED");
    }
    this.progress = "done";
  }

  reopen() {
    if (this.uncompleted()) {
      throwError("CANNOT_OPEN_WHEN_UNCOMPLETED");
    }
    this.progress = "open";
  }

  skip() {
    if (this.completed()) {
      throwError("CANNOT_SKIP_WHEN_COMPLETED");
    }
    this.progress = "skipped";
  }

  uncompleted() {
    return this.progress === "open";
  }

}

export function isProgress(value: unknown): value is Progress {
  if (typeof value !== "string") return false;
  return progresses.includes(value as Progress);
}
