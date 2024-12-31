import type { NodeData, NodeOptions } from "@/domain/node";

export type Kind = "artifact" | "directory";
export type NodeDataAndKind = { kind: Kind } & NodeData;
export type NodeOptionsAndKind = { kind: Kind } & NodeOptions;