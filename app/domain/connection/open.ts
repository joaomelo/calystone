import type { Connection } from "./connection";

export function open(connection: Connection, root: FileSystemDirectoryHandle) {
  connection.status = "open";
  connection.root = root;
};