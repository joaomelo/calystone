import { default as PageSignUp } from "./page-sign-up.vue";

const name = "page-sign-up";

export const signUpRoute = {
  path: "/page-sign-up",
  name,
  component: PageSignUp,
  meta: { external: true },
};

export function goSignUp(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
