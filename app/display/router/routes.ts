import {
  PageBootstrap,
  PageCalendar,
  PageFolders,
  PageOpen,
  PagePriority,
  PagePrivacy,
  PageSearch,
  PageTags,
  PageTerms
} from "@/display/views";
import { sources } from "@/infra";

export const routes = [
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
    meta: { connected: true },
    name: "calendar",
    path: "/calendar"
  },
  {
    component: PageFolders,
    meta: { connected: true },
    name: "folders",
    path: "/folders"
  },
  {
    component: PageSearch,
    meta: { connected: true },
    name: "search",
    path: "/search"
  },
  {
    component: PageTags,
    meta: { connected: true },
    name: "tags",
    path: "/tags"
  },
  {
    component: PagePriority,
    meta: { connected: true },
    name: "priority",
    path: "/priority"
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "open" }
  },
];
