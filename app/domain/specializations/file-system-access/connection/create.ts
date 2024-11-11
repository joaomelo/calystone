import { createConnection } from "@/domain/sources";

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