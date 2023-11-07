import type { App, InjectionKey } from "vue";
import type { Artifacts, Auth } from "@body";
import type { Display } from "@view";

export const key: InjectionKey<Pilot> = Symbol("pilot");

export class Pilot {
  readonly display;
  private readonly artifacts: Artifacts;
  private readonly auth: Auth;

  constructor({ artifacts, auth, display }: Options) {
    this.artifacts = artifacts;
    this.auth = auth;
    this.display = display;
    void this.display.toSignOut();
  }

  async singIn() {
    await this.auth.signIn();
    await this.artifacts.open();
    if (this.display.isEntryInternal()) {
      this.display.toEntry();
    } else {
      this.display.toPlan();
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.artifacts.close();
    this.display.toSignOut();
  }

  async addArtifact(name: string) {
    await this.artifacts.add({ name });
  }

  install(app: App) {
    app.provide(key, this);
  }
}

type Options = {
  artifacts: Artifacts;
  auth: Auth;
  display: Display;
};
