import { PageBootstrap, PageCalendar, PageNodes, PageOpen, PagePrivacy, PageSearch, PageTags, PageTerms } from "@/display/views";
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
    { component: PageBootstrap, name: "bootstrap", path: "/bootstrap/:source", props: true },

    { component: PagePrivacy, name: "privacy", path: "/privacy" },
    { component: PageTerms, name: "terms", path: "/terms" },

    { component: PageCalendar, name: "calendar", path: "/calendar" },
    { component: PageNodes, name: "outline", path: "/outline" },
    { component: PageSearch, name: "search", path: "/search" },
    { component: PageTags, name: "tags", path: "/tags" },

    { path: "/:pathMatch(.*)*", redirect: { name: "open" } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
