import type { NodeData } from "@/domain/node";

export type Kind = "artifact" | "directory";
export type NodeDataAndKind = { kind: Kind } & NodeData;