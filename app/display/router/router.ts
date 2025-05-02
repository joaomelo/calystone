import { PageBootstrap, PageOpen, PageOutline, PageOverview, PagePrivacy, PageSearch, PageTags, PageTerms } from "@/display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

export function createRouter() {
  const routes = [
    // root path must always represent the welcome componente without redirects to succedd in auto chekcks by file cloud providers
    { component: PageOpen, name: "open", path: "/" },

    {
      path: "/transfer-dropbox",
      redirect: { name: "bootstrap", params: { source: "dropbox" } }
    },
    {
      path: "/transfer-one-drive",
      redirect: { name: "bootstrap", params: { source: "one-drive" } }
    },

    { component: PagePrivacy, name: "privacy", path: "/privacy" },
    { component: PageTerms, name: "terms", path: "/terms" },
    { component: PageOverview, name: "overview", path: "/overview" },
    { component: PageBootstrap, name: "bootstrap", path: "/bootstrap/:source", props: true },

    { component: PageOutline, name: "outline", path: "/outline" },
    { component: PageSearch, name: "search", path: "/search" },
    { component: PageTags, name: "tags", path: "/tags" },

    { path: "/:pathMatch(.*)*", redirect: { name: "open" } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
