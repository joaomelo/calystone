import type { Nodes } from "@/domain";
import type { FileSystemAdapter, Source } from "@/infra";

export type ObserverOptions = ObserverOptionsConnected | ObserverOptionsDisconnected;
export type Observers = Set<StatusObserver>;
export type Status = "connected" | "disconnected";

export type StatusObserver = (options: ObserverOptions) => void;

interface ObserverOptionsConnected {
  fileSystemAdapter: FileSystemAdapter;
  nodes: Nodes;
  source: Source;
  status: "connected"
}
interface ObserverOptionsDisconnected { status: "disconnected" }

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