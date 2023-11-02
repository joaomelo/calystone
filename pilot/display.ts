import type { Component } from "vue";
import { Page } from "./page";

// import { reactive, markRaw } from "vue";
import { PageAuth, PageArtifactsPlan } from "@view";

export class Display {
  component: Component;
  pages: Page[] = [];

  constructor() {
    const pageAuth = new Page("page-auth", PageAuth);
    this.pages.push(pageAuth);
    this.pages.push(new Page("page-artifacts-plan", PageArtifactsPlan));

    this.component = pageAuth;
  }

  push(slug: string) {
    const page = this.pages.find((page) => page.is(slug));
    if (!page) throw new Error("page not found");
    this.page = page;
  }
}
