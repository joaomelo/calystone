import { default as PageSignIn } from "./page-sign-in.vue";

const name = "page-sign-in";

export const signInRoute = {
  component: PageSignIn,
  meta: { external: true },
  name,
  path: `/${name}`,
};

export function goSignIn(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
