import type { Source } from "@/infra";

export type ObserverOptions = { source: Source; status: "connected", } | { status: "disconnected" };
export type Observers = Set<StatusObserver>;
export type Status = "connected" | "disconnected";
export type StatusObserver = (options: ObserverOptions) => void;

export class StatusObservable {
  status: Status = "disconnected";
  private observers: Observers = new Set();

  next(options: ObserverOptions) {
    this.status = options.status;
    this.observers.forEach(observer => { observer(options); });
  }

  subscribe(observer: StatusObserver) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
}