import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export class Display {
  private readonly entry: RouteLocation & { href: string };
  private router: Router;

  constructor(app: App) {
    this.router = createRouter({
      history: createWebHistory(),
      routes,
    });

    const entryPath = window.location.pathname;
    this.entry = this.router.resolve(entryPath);

    app.use(this.router);
  }

  isEntryInternal() {
    return this.entry.meta.internal;
  }

  toEntry() {
    this.push(this.entry.fullPath);
  }

  toUnsolved() {
    this.push("/page-unsolved");
  }

  toSignOut() {
    this.push("/page-auth");
  }

  toPlan() {
    this.push("/page-artifacts-plan");
  }

  toEdit() {
    this.push("/page-artifacts-edit");
  }

  private push(path: string) {
    void this.router.push(path);
  }
}
