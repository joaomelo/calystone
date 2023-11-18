import { reactive } from "vue";
import { AUTH_STATUSES, useTask, treeify } from "@lib";
import { key } from "./key";

export class Pilot {
  router;
  artifacts;
  auth;

  constructor({ artifacts, auth, router }) {
    this.artifacts = artifacts;
    this.auth = auth;
    this.router = router;
  }

  install(app) {
    app.provide(key, this);
  }

  unsolveCase() {
    const task = useTask(() => this.router.push({ name: "page-unsolved" }));
    return { task };
  }

  solveCase() {
    const task = useTask(async () => {
      const status = await this.auth.open();

      if (status === AUTH_STATUSES.SIGNED_IN) {
        await this.artifacts.open(this.auth.userId);
        this.router.push({ name: "page-artifacts-plan" });
      } else {
        this.router.push({ name: "page-auth" });
      }
    });
    return { task };
  }

  signInCase() {
    const payload = reactive({ email: null, password: null });

    const task = useTask(async () => {
      await this.auth.signIn(payload);
      await this.artifacts.open(this.auth.userId);
      this.router.push({ name: "page-artifacts-plan" });
    });

    return { payload, task };
  }

  signOutCase() {
    const task = useTask(async () => {
      await this.auth.signOut();
      this.artifacts.close();
      this.router.push({ name: "page-auth" });
    });
    return { task };
  }

  artifactAddCase() {
    const usersIds = [this.auth.userId];
    const payload = {
      name: null,
      parentId: null,
    };

    const task = useTask(async () => {
      await this.artifacts.add({ ...payload, usersIds });
      payload.name = null;
      payload.parentId = null;
    });

    return { task, payload };
  }

  artifactsListCase() {
    const map = (artifact) => ({
      value: artifact.id,
      text: artifact.name,
      actions: [],
    });
    const getter = (artifacts) => treeify(artifacts, { map });
    const artifacts = this.artifacts.computed(getter);
    return { artifacts };
  }
}
