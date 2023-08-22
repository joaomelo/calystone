import {
  PageAuth,
  PageLoading,
  PageProgramEdit,
  PageProgramPlan,
  PagePrograms,
  PageProgramSharing,
} from "../pages";
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
  programs: {
    path: "/programs/list",
    component: PagePrograms,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
  },
  programSharing: {
    path: "/programs/sharing/:programId",
    component: PageProgramSharing,
    props: true,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
  },
  programEdit: {
    path: "/programs/edit/:programId",
    component: PageProgramEdit,
    props: true,
    meta: { visibility: ROUTE_VISIBILITY.INTERNAL },
  },
  programPlan: {
    path: "/programs/plan/:programId",
    component: PageProgramPlan,
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
