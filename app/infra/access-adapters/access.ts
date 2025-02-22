export interface AccessAdapter<T> {
  request(): Promise<void> | void;
  acquire(): Promise<T> | T;
}