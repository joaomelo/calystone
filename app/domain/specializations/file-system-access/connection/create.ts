import { createConnection } from "@/domain/connection";

import type { FsaConnection } from "./connection";

export function createFsaConnection(root: FileSystemDirectoryHandle): FsaConnection {
  return {
    ...createConnection(),
    resources: {
      root,
      source: "file-system-access"
    }
  };
};