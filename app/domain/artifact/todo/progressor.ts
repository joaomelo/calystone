export type Progress = (typeof progresses)[number];

const progresses = ["open", "doing", "done", "skipped" ] as const;
const defaultProgress: Progress = "open";

export class Progressor {
  progress: Progress;

  constructor(progress: Progress = defaultProgress) {
    this.progress = progress;
  }

  static isProgress(value: unknown): value is Progress {
    if (typeof value !== "string") return false;
    return progresses.includes(value as Progress);
  }

  completed() {
    return this.progress === "done" || this.progress === "skipped";
  }

  done() {
    this.set("done");
  }

  open() {
    this.set("open");
  }

  set(progress: Progress) {
    this.progress = progress;
  }

  skip() {
    this.set("skipped");
  }

  start() {
    this.set("doing");
  }

  uncompleted() {
    return this.progress === "open" || this.progress === "doing";
  }

}
