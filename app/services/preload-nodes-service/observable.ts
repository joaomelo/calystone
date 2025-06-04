export type Observer = (options: ObserverOptions) => void;
export interface ObserverOptions { status: Status }
export type Status = "idle" | "loading";

export class Observable {
  private observers = new Set<Observer>();
  private status: Status = "idle";

  next(options: ObserverOptions) {
    this.status = options.status;
    this.observers.forEach(observer => { observer(options); });
  }

  subscribe(observer: Observer) {
    observer({ status: this.status });

    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
}