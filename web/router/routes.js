import {
  PageAuth,
  PageLoadingAuth,
  PageLoadingDatasets,
  PageArtifactsPlan,
  PageArtifactEdit,
} from "../pages";
import { ROUTE_VISIBILITY } from "./visibilities";

export const routes = {
  auth: {
    path: "/auth",
    component: PageAuth,
    meta: { visibility: ROUTE_VISIBILITY.EXTERNAL },
  },
  loadingAuth: {
    path: "/loading-auth",
    component: PageLoadingAuth,
    meta: { visibility: ROUTE_VISIBILITY.PUBLIC },
  },
  loadingDatasets: {
    path: "/loading-datasets",
    component: PageLoadingDatasets,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
    props: (route) => ({ entryRoute: route.query.entryRoute }),
  },
  artifactsPlan: {
    path: "/artifacts/plan",
    component: PageArtifactsPlan,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL, entry: true },
  },
  artifactEdit: {
    path: "/artifacts/edit/:artifactId",
    component: PageArtifactEdit,
    props: true,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL, entry: true },
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
