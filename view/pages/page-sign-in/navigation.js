import { default as PageSignIn } from "./page-sign-in.vue";

const name = "page-sign-in";

export const signInRoute = {
  path: "/page-sign-in",
  name,
  component: PageSignIn,
};

export function goSignIn(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
