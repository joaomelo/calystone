import type { Id, Kind, NodeDataAndKind } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { isId } from "@/domain";
import { throwError } from "@/utils";

export function driveItemToNodeData(item: DriveItem, parentId: Id): NodeDataAndKind {
  if (!isId(item.id)) throwError("INVALID_ID", "driveItem from OneDrive has no id");
  if (typeof item.name !== "string") throwError("NO_NAME", `driveItem from OneDrive with id ${item.id} does not have a name`);

  const kind: Kind = item.folder ? "directory" : "artifact";
  const child: NodeDataAndKind = {
    id: item.id,
    kind,
    name: item.name,
    parentId,
  };
  return child;
}