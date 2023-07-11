import { PageLoading, PageProjects, PageAuth, PageSharing } from "../pages";
import { ROUTE_VISIBILITY } from "./visibilities";

export const routes = {
  auth: {
    path: "/auth",
    component: PageAuth,
    meta: { visibility: ROUTE_VISIBILITY.EXTERNAL },
  },
  loading: {
    path: "/loading",
    component: PageLoading,
    meta: { visibility: ROUTE_VISIBILITY.PUBLIC },
  },
  projects: {
    path: "/projects/list",
    component: PageProjects,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
  },
  sharing: {
    path: "/projects/sharing/:projectId",
    component: PageSharing,
    props: true,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
  },
};

// used to list all routes in a array combined name and configuration
export const routesConfigs = Object.entries(routes).map(([name, config]) => ({
  name,
  ...config,
}));

// hash table of the routes paths indexed by the routes names
export const routesPaths = Object.entries(routes).reduce(
  (acc, [name, config]) => {
    acc[name] = config.path;
    return acc;
  },
  {}
);
