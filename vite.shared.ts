import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import {
  fileURLToPath,
  URL
} from "node:url";

export const projectRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
export const appRoot = resolve(projectRoot, "app", "main");
export const aliasAtProject = { "@": resolve(projectRoot, "app") };

export const resolveAtProject = (...paths: string[]) => resolve(projectRoot, ...paths);
export const resolveAtApp = (...paths: string[]) => resolve(appRoot, ...paths);

export function sharedPlugins() {
  return [vue()];
}