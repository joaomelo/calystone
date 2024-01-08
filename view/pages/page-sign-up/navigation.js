import { default as PageSignUp } from "./page-sign-up.vue";

const name = "page-sign-up";

export const signUpRoute = {
  component: PageSignUp,
  meta: { external: true },
  name,
  path: "/page-sign-up",
};

export function goSignUp(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
