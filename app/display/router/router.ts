import { FrameDashboard, PageOpen, PageOutline, PageSearch, PageTags } from "@/display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { activities, defaultActivity } from "../activities";
import PageBootstrap from "../views/page-bootstrap/page-bootstrap.vue";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: defaultActivity } },

    {
      component: PageOpen,
      name: activities.open,
      path: `/${activities.open}`
    },

    {
      path: "/transfer-one-drive",
      redirect: {
        name: activities.bootstrap,
        params: { source: "one-drive" }
      }
    },
    {
      component: PageBootstrap,
      name: activities.bootstrap,
      path: `/${activities.bootstrap}/:source`,
      props: true
    },

    {
      children: [
        { component: PageOutline, ...nameAndPath(activities.outline) },
        { component: PageSearch, ...nameAndPath(activities.search) },
        { component: PageTags, ...nameAndPath(activities.tags) }
      ],
      component: FrameDashboard,
      path: "/in"
    },

    { path: "/:pathMatch(.*)*", redirect: { name: defaultActivity } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}

function nameAndPath(base: string) {
  return { name: base, path: base };
}