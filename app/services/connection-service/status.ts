import type { FileSystemAdapter } from "@/services/adapters";

export type Observer = (options: ObserverOptions) => void;
export type ObserverOptions = { fileSystemAdapter: FileSystemAdapter; value: "connected", } | { value: "disconnected" };
export type Observers = Set<Observer>;
export type Value = "connected" | "disconnected";

export class Status {
  value: Value = "disconnected";
  private observers: Observers = new Set();

  next(options: ObserverOptions) {
    this.value = options.value;
    this.observers.forEach(observer => { observer(options); });
  }

  subscribe(observer: Observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
}