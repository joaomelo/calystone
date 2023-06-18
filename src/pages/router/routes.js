import { PageDisambiguate } from "../page-disambiguate";
import { PageProjects } from "../page-projects";
import { PageAuth } from "../page-auth";

export const routes = {
  auth: { path: "/auth", component: PageAuth },
  disambiguate: { path: "/disambiguate", component: PageDisambiguate },
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
