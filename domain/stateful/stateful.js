import { BehaviorSubject } from "rxjs";

export class Stateful {
  #subject;

  constructor() {
    // the subject will hold a reference to the instance as a convenience for map functions. what really matters is the notify event signaling the state has updated
    this.#subject = new BehaviorSubject(this);
  }

  subscribe(observer) {
    const subscription = this.#subject.subscribe(observer);
    return () => subscription.unsubscribe();
  }

  notify() {
    this.#subject.next(this);
  }
}
