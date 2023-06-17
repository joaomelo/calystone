import { PageProjects } from "../pages";

export const routes = {
  projects: { path: "/projects", component: PageProjects },
  // open: {
  //   path: "/measurement",
  //   component: PageMeasurement,
  //   props: (route) => ({ id: route.query.id }),
  // },
};

export const routesConfigs = Object.entries(routes).map(([name, config]) => ({
  name,
  ...config,
}));

export const routesPaths = Object.entries(routes).reduce(
  (acc, [name, config]) => {
    acc[name] = config.path;
    return acc;
  },
  {}
);
