import type { Node } from "@/domain";

import type { SupportAdapter } from "./support";

interface Options {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}

export class CloudSupportAdapter implements SupportAdapter {
  clientId: string | undefined;
  redirectUrl: string | undefined;

  constructor({ clientId, redirectUrl }: Options) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  access() {
    return typeof this.clientId === "string" && typeof this.redirectUrl === "string";
  }

  rename(node: Node) {
    if (node.isRoot()) return false;
    return this.access();
  }
};