import { type Id } from "@/domain/ids";

export type Artifact = Directory | File;

interface File extends Base {
  content: Promise<Blob>,
  type: "file",
};

interface Directory extends Base {
  content?: never,
  type: "directory",
};

interface Base {
  id: Id,
  name: string,
  parentId?: Id,
  type: Type,
};

type Type = "directory" | "file";

