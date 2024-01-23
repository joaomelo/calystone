export class Artifacts {
  auth;
  mutator;
  selector;

  constructor({ auth, mutator, selector }) {
    this.mutator = mutator;
    this.selector = selector;
    this.auth = auth;

    // this.selector.set({
    //   name: "artifacts",
    //   orderBy: "order",
    //   wheres: [
    //     {
    //       field: "userId",
    //       operator: "==",
    //       value: () => this.auth.solveUser().id,
    //     },
    //   ],
    // });
  }

  list() {
    return this.select().list();
  }

  open() {
    return this.select().open();
  }

  select() {
    return this.selector.get("artifacts");
  }
}
