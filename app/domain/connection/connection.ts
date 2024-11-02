export type Connection = ActiveConnection | ClosedConnectiion;

export interface ActiveConnection {
  root: FileSystemDirectoryHandle
  status: "loading" | "open";
}

export interface ClosedConnectiion {
  // the optional presence of root allows for a transition state while the status is set to close and then the root is set to undefined
  root?: FileSystemDirectoryHandle
  status: "closed",
}
