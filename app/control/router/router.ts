import { ControlDashboard,ControlOpen,ControlOutline,ControlPreferences,ControlSearch,ControlTags } from "@/control/controls";
import { ACTIVITIES, DEFAULT_ACTIVITY, FrameFocus } from "@/display";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: DEFAULT_ACTIVITY } },

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

    { path: "/:pathMatch(.*)*", redirect: { name: DEFAULT_ACTIVITY } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}

function nameAndPath(base: string) {
  return { name: base, path: base };
}