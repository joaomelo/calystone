import type { Nodes } from "@/domain";
import type {
  FileSystemAdapter, Source
} from "@/infra";

export type ConnectionState = ConnectionStateConnected | ConnectionStateDisconnected;

interface ConnectionStateConnected {
  fileSystemAdapter: FileSystemAdapter;
  nodes: Nodes;
  source: Source;
  status: "connected"
}

interface ConnectionStateDisconnected {
  fileSystemAdapter: undefined;
  nodes: undefined;
  source: undefined;
  status: "disconnected"
}
