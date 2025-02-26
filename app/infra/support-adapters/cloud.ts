import type { SupportAdapter } from "@/services";

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

  renameDirectory() {
    return this.access();
  }

  renameFile() {
    return this.access();
  }
};