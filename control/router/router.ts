import { FrameFocus } from "@display";
import { ACTIVITIES } from "@domain";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { ControlDashboard } from "../control-dashboard";
import { ControlOpen } from "../control-open";
import { ControlOutline } from "../control-outline";
import { ControlPreferences } from "../control-preferences";
import { ControlSearch } from "../control-search";
import { ControlTags } from "../control-tags";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: ACTIVITIES.OPEN } },

    {
      children: [
        { component: ControlOpen, ...nameAndPath(ACTIVITIES.OPEN) },
      ],
      component: FrameFocus,
      path: "/out"
    },

    {
      children: [
        { component: ControlOutline, ...nameAndPath(ACTIVITIES.OUTLINE) },
        { component: ControlPreferences, ...nameAndPath(ACTIVITIES.PREFERENCES) },
        { component: ControlSearch, ...nameAndPath(ACTIVITIES.SEARCH) },
        { component: ControlTags, ...nameAndPath(ACTIVITIES.TAGS) }
      ],
      component: ControlDashboard,
      path: "/in"
    },

    { path: "/:pathMatch(.*)*", redirect: { name: ACTIVITIES.OPEN } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}

function nameAndPath(base: string) {
  return { name: base, path: base };
}