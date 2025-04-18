export type LoadNodesObserver = (options: ObserverOptions) => void;
export interface ObserverOptions { status: Status }
export type Status = "idle" | "loading";

export class LoadNodesObservable {
  private observers = new Set<LoadNodesObserver>();
  private status: Status = "idle";

  next(options: ObserverOptions) {
    this.status = options.status;
    this.observers.forEach(observer => { observer(options); });
  }

  subscribe(observer: LoadNodesObserver) {
    observer({ status: this.status });

    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
}