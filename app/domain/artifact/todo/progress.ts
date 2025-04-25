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
    this.progress = "done";
  }

  reopen() {
    this.progress = "open";
  }

  skip() {
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
