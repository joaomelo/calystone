import type { Component } from "vue";

export class Page {
  readonly slug: string;
  readonly component: Component;

  constructor(slug: string, component: Component) {
    this.slug = slug;
    this.component = component;
  }

  is(slug: string) {
    return this.slug === slug;
  }
}
