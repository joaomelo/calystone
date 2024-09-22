import { FrameFocus, PageOpen } from "@display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

export function createRouter() {
  const routes = [
    { path: "/", redirect: { name: "open" } },

    {
      children: [
        {
          component: PageOpen,
          name: "open",
          path: "open"
        },
      ],
      component: FrameFocus,
      path: "/out"
    },

    { path: "/:pathMatch(.*)*", redirect: { name: "open" } },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
