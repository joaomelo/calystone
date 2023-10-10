import { PluginMemory } from "./plugin-memory";
import { PluginFile } from "./plugin-file";

export function createPlugin(options) {
  switch (options?.plugin) {
    case "memory":
      return new PluginMemory(options);
    case "file":
      return new PluginFile(options);
    default:
      return new PluginMemory(options);
  }
}
