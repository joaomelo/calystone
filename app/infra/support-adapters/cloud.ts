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
    return this.isCloudConfigured();
  }

  createArtifact() {
    return this.isCloudConfigured();
  }

  createDirectory() {
    return this.isCloudConfigured();
  }

  move(node: Node) {
    if (node.isRoot()) return false;
    return this.isCloudConfigured();
  }

  remove(node: Node) {
    if (node.isRoot()) return false;
    return this.isCloudConfigured();
  }

  rename(node: Node) {
    if (node.isRoot()) return false;
    return this.isCloudConfigured();
  }

  private isCloudConfigured() {
    return typeof this.clientId === "string" && typeof this.redirectUrl === "string";
  }
};