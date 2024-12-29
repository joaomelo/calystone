import type { Id, Kind, NodeDataAndKind } from "@/domain";

import { createId } from "@/domain";

export async function openDirectory(parentHandle: FileSystemDirectoryHandle, parentId?: Id): Promise<NodeDataAndKind[]> {
  const childrenData: NodeDataAndKind[] = [];
  for await (const handle of parentHandle.values()) {
    const kind: Kind = handle.kind === "file" ? "artifact" : "directory";
    const childData = {
      id: createId(),
      kind,
      name: handle.name,
      parentId: parentId,
    };
    childrenData.push(childData);
  }
  return childrenData;
}
