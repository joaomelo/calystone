import type { Node } from "@/domain";

import { Directory } from "@/domain";
import { Status } from "@/utils";

// support adapters care only about the source support of the operation, it does not care about domain or service rules. methods should only receive parameters and evalute logic if related  to infra support concerns. other validations should be done in the domain or service layer.
export abstract class SupportAdapter {
  abstract access(): Status;
  abstract createArtifact(): Status;
  abstract createDirectory(): Status;

  failIfDirectory(node: Node) {
    if (node instanceof Directory) return Status.fail("DIRECTORY_NODE");
    return Status.ok();
  }

  failIfRoot(node: Node) {
    if (node.isRoot()) return Status.fail("ROOT_NODE");
    return Status.ok();
  }

  abstract move(subject: Node): Status;
  abstract remove(node: Node): Status;
  abstract rename(node: Node): Status;
  abstract share(node: Node): Status;
}