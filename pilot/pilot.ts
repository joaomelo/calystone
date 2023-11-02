import type { Driver } from "@service";
import type { Dispatch } from "@shared";
import type { Display } from "@view";

import { Artifacts, Auth } from "@body";

export class Pilot {
  readonly display;
  props: Record<string, unknown> = {};
  private readonly artifacts: Artifacts;
  private readonly auth: Auth;

  constructor({ driver, display }: Options) {
    this.artifacts = new Artifacts(driver);
    this.auth = new Auth(this.artifacts);
    this.display = display;
    void this.display.signOut();
  }

  dispatch: Dispatch = (message) => {
    switch (message.name) {
      case "sign-in":
        void this.handleSignIn();
        break;
    }
  };

  async handleSignIn() {
    this.props.busy = true;
    await this.auth.signIn();
    await this.display.signIn();
    this.props.busy = false;
  }
}

type Options = {
  driver: Driver;
  display: Display;
};
