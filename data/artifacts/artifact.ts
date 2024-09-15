type Kind = "directory" | "file";

export class Artifact {
  readonly name: string;
  readonly kind: Kind;
  readonly parent?: Artifact;
  readonly children: Artifact[] = [];

  constructor(name: string, type: Kind, parent?: Artifact) {
    this.name = name;
    this.kind = type;

    if (parent) {
      this.parent = parent;
      parent.children.push(this);
    }
  }
}