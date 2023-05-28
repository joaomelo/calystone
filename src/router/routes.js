import { PageDashboard, PageMeasurement } from "../pages";

export const routes = {
  dashboard: { path: "/dashboard", component: PageDashboard },
  open: {
    path: "/measurement",
    component: PageMeasurement,
    props: (route) => ({ id: route.query.id }),
  },
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
