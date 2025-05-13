export type Progress = (typeof progresses)[number];

const progresses = ["open", "doing", "done", "skipped" ] as const;
const defaultProgress: Progress = "open";

export class Progressor {
  progress: Progress;

  constructor(progress: Progress = defaultProgress) {
    this.progress = progress;
  }

  static completed(progressOrProgressor: Progress | Progressor) {
    const progress = progressOrProgressor instanceof Progressor ? progressOrProgressor.progress : progressOrProgressor;
    return progress === "done" || progress === "skipped";
  }

  static isProgress(value: unknown): value is Progress {
    if (typeof value !== "string") return false;
    return progresses.includes(value as Progress);
  }

  static uncompleted(progressOrProgressor: Progress | Progressor) {
    const progress = progressOrProgressor instanceof Progressor ? progressOrProgressor.progress : progressOrProgressor;
    return progress === "open" || progress === "doing";
  }

  completed() {
    return Progressor.completed(this);
  }

  reset() {
    this.progress = defaultProgress;
  }

  set(progress: Progress) {
    this.progress = progress;
  }

  uncompleted() {
    return Progressor.uncompleted(this);
  }

}
