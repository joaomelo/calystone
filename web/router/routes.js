import { PageLoading, PageProjects, PageAuth } from "../pages";

export const routes = {
  auth: { path: "/auth", component: PageAuth },
  loading: { path: "/loading", component: PageLoading },
  projects: { path: "/projects", component: PageProjects },
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
