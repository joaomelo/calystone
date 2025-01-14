export interface AccessService<T> {
  request(): Promise<void> | void;
  acquire(): Promise<T> | T;
}