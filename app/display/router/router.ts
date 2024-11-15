import { ACTIVITIES, DEFAULT_ACTIVITY } from "@/display/activities";
import { FrameDashboard, PageOpen, PageOutline, PagePreferences, PageSearch, PageTags } from "@/display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: DEFAULT_ACTIVITY } },

    { component: PageOpen, name: ACTIVITIES.OPEN, path: `/${ACTIVITIES.OPEN}` },

    {
      children: [
        { component: PageOutline, ...nameAndPath(ACTIVITIES.OUTLINE) },
        { component: PagePreferences, ...nameAndPath(ACTIVITIES.PREFERENCES) },
        { component: PageSearch, ...nameAndPath(ACTIVITIES.SEARCH) },
        { component: PageTags, ...nameAndPath(ACTIVITIES.TAGS) }
      ],
      component: FrameDashboard,
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