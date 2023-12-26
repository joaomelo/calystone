import { default as PageSignIn } from "./page-sign-in.vue";

const name = "page-sign-in";

export const signInRoute = {
  path: `/${name}`,
  name,
  component: PageSignIn,
  meta: { external: true },
};

export function goSignIn(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
