type Type = "directory" | "file";

export interface Artifact {
  readonly name: string;
  readonly parent: Artifact | null;
  readonly type: Type;
}