import type { Node } from "@/domain/nodes";

import type { FsaConnection } from "../connection";

import { loadDirectory } from "./directory";

export async function* loadFsa(connection: FsaConnection): AsyncGenerator<Node> {
  const root = connection.resources.root;
  yield* loadDirectory(root);
};
