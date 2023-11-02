import type { Component } from "vue";
import type { Driver } from "@service";
import type { Dispatch } from "@shared";

import { Artifacts, Auth } from "@body";
import { Display } from "./display";

export class Pilot {
  private display = new Display();
  props: Record<string, unknown> = {};
  private readonly artifacts: Artifacts;
  private readonly auth: Auth;

  constructor(driver: Driver) {
    this.artifacts = new Artifacts(driver);
    this.auth = new Auth(this.artifacts);
  }

  get component(): Component {
    return this.display.component;
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
    this.props.busy = false;

    this.display.push("page-artifacts-plan");
  }
}
