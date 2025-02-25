import type { FileSystemAdapter } from "@/services/adapters";

export type Observer = (status: Value, fileSystemAdapter?: FileSystemAdapter) => void;
export type Observers = Set<Observer>;
export type Value = "connected" | "disconnected";

export class Status {
  value: Value = "disconnected";
  private observers: Observers = new Set();

  next(value: Value, fileSystemAdapter?: FileSystemAdapter) {
    this.value = value;
    this.observers.forEach(observer => { observer(value, fileSystemAdapter); });
  }

  subscribe(observer: Observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
}