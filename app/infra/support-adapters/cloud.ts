import type { Node } from "@/domain";

import { Status } from "@/utils";

import { SupportAdapter } from "./support";

interface Options {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}

export class CloudSupportAdapter extends SupportAdapter {
  clientId: string | undefined;
  redirectUrl: string | undefined;

  constructor({ clientId, redirectUrl }: Options) {
    super();
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  access() {
    return this.configured();
  }

  createArtifact() {
    return this.configured();
  }

  createDirectory() {
    return this.configured();
  }

  move(subject: Node) {
    const rootStatus = this.failIfRoot(subject);
    if (rootStatus.isFail()) return rootStatus;
    return this.configured();
  }

  remove(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;
    return this.configured();
  }

  rename(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;
    return this.configured();
  }

  share() {
    return Status.fail("NOT_IMPLEMENTED");
  }

  private configured() {
    if (typeof this.clientId !== "string") return Status.fail("CLIENT_ID_NOT_CONFIGURED");
    if (typeof this.redirectUrl !== "string") return Status.fail("REDIRECT_URL_NOT_CONFIGURED");
    return Status.ok();
  }
};