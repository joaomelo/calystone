import { FrameFocus } from "@display";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { ControlDashboard } from "../control-dashboard";
import { ControlOpen } from "../control-open";
import { ControlOutline } from "../control-outline";
import { ControlPreferences } from "../control-preferences";
import { ControlSearch } from "../control-search";
import { ControlTags } from "../control-tags";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: "open" } },

    {
      children: [
        { component: ControlOpen, name: "open", path: "open" },
      ],
      component: FrameFocus,
      path: "/out"
    },

    {
      children: [
        { 
          component: ControlOutline, 
          meta: { access: "internal" }, 
          name: "outline", 
          path: "outline" 
        },
        { 
          component: ControlPreferences, 
          meta: { access: "internal" }, 
          name: "preferences", 
          path: "preferences" 
        },
        { 
          component: ControlSearch, 
          meta: { access: "internal" }, 
          name: "search", 
          path: "search" 
        },
        { 
          component: ControlTags, 
          meta: { access: "internal" }, 
          name: "tags", 
          path: "tags" 
        }
      ],
      component: ControlDashboard,
      path: "/in"
    },

    { path: "/:pathMatch(.*)*", redirect: { name: "open" } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
