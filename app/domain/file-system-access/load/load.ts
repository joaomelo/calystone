import type { Node } from "@/domain/node";

import type { FileSystemAccessMedia } from "../media";

import { loadDirectory } from "./directory";

export async function* loadFileSystemAccess(media: FileSystemAccessMedia): AsyncGenerator<Node> {
  const root = media.resources.root;
  yield* loadDirectory(root);
};
