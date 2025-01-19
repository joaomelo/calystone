import { FrameCard, FrameDashboard, PageOpen, PageOutline, PagePrivacy, PageSearch, PageTags, PageTerms } from "@/display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import PageBootstrap from "../views/page-bootstrap/page-bootstrap.vue";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: "open" } },

    {
      path: "/transfer-one-drive",
      redirect: { name: "bootstrap", params: { source: "one-drive" } }
    },
    {
      path: "/transfer-google-drive",
      redirect: { name: "bootstrap", params: { source: "google-drive" } }
    },

    {
      children: [
        { component: PageOpen, name: "open", path: "open" },
        { component: PagePrivacy, name: "privacy", path: "privacy" },
        { component: PageTerms, name: "terms", path: "terms" },
        { component: PageBootstrap, name: "bootstrap", path: "bootstrap/:source", props: true },

      ],
      component: FrameCard,
      path: "/out"
    },

    {
      children: [
        { component: PageOutline, name: "outline", path: "outline" },
        { component: PageSearch, name: "search", path: "search" },
        { component: PageTags, name: "tags", path: "tags" }
      ],
      component: FrameDashboard,
      path: "/in"
    },

    { path: "/:pathMatch(.*)*", redirect: { name: "open" } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
