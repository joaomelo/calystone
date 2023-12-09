import { default as PageAuth } from "./page-auth.vue";

const name = "page-auth";

export const authRoute = {
  path: "/page-auth",
  name,
  component: PageAuth,
};

export function isAuth(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goAuth(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
