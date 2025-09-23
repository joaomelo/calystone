import { compareByRank } from "@/utils";

export type Progress = (typeof progresses)[number];

const progresses = ["open", "doing", "done", "skipped" ] as const;
const defaultProgress: Progress = "open";

type ProgressorOrProgress = Progress | Progressor;

export class Progressor {
  static compare(a: ProgressorOrProgress, b: ProgressorOrProgress): number {
    const compare = compareByRank<ProgressorOrProgress, Progress>({
      rank: progresses,
      select: (progressorOrProgress) => {
        if (progressorOrProgress instanceof Progressor) {
          return progressorOrProgress.progress;
        }
        return progressorOrProgress;
      }
    });
    return compare(a, b);
  }

  static isProgress(value: unknown): value is Progress {
    if (typeof value !== "string") return false;
    return progresses.includes(value as Progress);
  }

  static completed(progressOrProgressor: ProgressorOrProgress) {
    const progress = progressOrProgressor instanceof Progressor ? progressOrProgressor.progress : progressOrProgressor;
    return progress === "done" || progress === "skipped";
  }

  static uncompleted(progressOrProgressor: ProgressorOrProgress) {
    const progress = progressOrProgressor instanceof Progressor ? progressOrProgressor.progress : progressOrProgressor;
    return progress === "open" || progress === "doing";
  }

  private _progress: Progress;

  constructor(progress: Progress = defaultProgress) {
    this._progress = progress;
  }

  get progress() {
    return this._progress;
  }

  get completed() {
    return Progressor.completed(this);
  }

  get uncompleted() {
    return Progressor.uncompleted(this);
  }

  reset() {
    this.set(defaultProgress);
  }

  set(progress: Progress) {
    this._progress = progress;
  }

}
