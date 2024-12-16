import { FrameDashboard, PageOpen, PageOutline, PagePreferences, PageSearch, PageTags } from "@/display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { activities, defaultActivity } from "../activities";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: defaultActivity } },

    { component: PageOpen, name: activities.open, path: `/${activities.open}` },

    {
      children: [
        { component: PageOutline, ...nameAndPath(activities.outline) },
        { component: PagePreferences, ...nameAndPath(activities.preferences) },
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