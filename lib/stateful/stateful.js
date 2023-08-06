import { BehaviorSubject } from "rxjs";

export class Stateful {
  _subject;

  constructor() {
    // the subject will hold a reference to the instance as a convenience for map functions. what really matters is the notify event signaling the state has updated
    this._subject = new BehaviorSubject(this);
  }

  subscribe(observer) {
    const subscription = this._subject.subscribe(observer);
    return () => subscription.unsubscribe();
  }

  notify() {
    this._subject.next(this);
  }
}
