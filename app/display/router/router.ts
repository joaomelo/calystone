import {
  PageBootstrap,
  PageCalendar,
  PageNodes,
  PageOpen,
  PagePriority,
  PagePrivacy,
  PageSearch,
  PageTags,
  PageTerms
} from "@/display/views";
import { sources } from "@/infra";
import {
  createRouter as createVueRouter,
  createWebHistory
} from "vue-router";

export function createRouter() {
  const routes = [
    // root path must always represent the welcome componente without redirects to succedd in auto chekcks by file cloud providers
    {
      component: PageOpen,
      name: "open",
      path: "/"
    },

    {
      path: "/transfer-dropbox",
      redirect: {
        name: "bootstrap",
        params: { "provider": sources.dropbox.provider }
      }
    },
    {
      path: "/transfer-one-drive",
      redirect: {
        name: "bootstrap",
        params: { "provider": sources.oneDrive.provider }
      }
    },
    {
      component: PageBootstrap,
      name: "bootstrap",
      path: "/bootstrap/:provider",
      props: true
    },

    {
      component: PagePrivacy,
      name: "privacy",
      path: "/privacy"
    },
    {
      component: PageTerms,
      name: "terms",
      path: "/terms"
    },

    {
      component: PageCalendar,
      name: "calendar",
      path: "/calendar"
    },
    {
      component: PageNodes,
      name: "nodes",
      path: "/nodes"
    },
    {
      component: PageSearch,
      name: "search",
      path: "/search"
    },
    {
      component: PageTags,
      name: "tags",
      path: "/tags"
    },
    {
      component: PagePriority,
      name: "priority",
      path: "/priority"
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "open" }
    },
  ];

  const router = createVueRouter({
    history: createWebHistory(),
    routes
  });
  return router;
}
